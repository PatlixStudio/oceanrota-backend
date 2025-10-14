import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet, WalletType } from './entities/wallet.entity';
import { User } from '../user/entities/user.entity';
import { Vessel } from '../marketplace/entities/vessel.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { TokenizeVesselDto } from './dto/tokenize-vessel.dto';
import { randomBytes } from 'crypto';
import { TransferTokenDto } from './dto/transfer-token.dto';
import { FractionalizeDto } from './dto/fractionalize.dto';

@Injectable()
export class TokenizationService {
    constructor(
        @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Vessel) private vesselRepo: Repository<Vessel>,
        private dataSource: DataSource,
    ) { }

    async createWallet(dto: CreateWalletDto): Promise<Wallet> {
        let user: User | null = null;
        let vessel: Vessel | null = null;

        if (dto.type === WalletType.USER && dto.ownerId) {
            user = await this.userRepo.findOne({ where: { id: Number(dto.ownerId) } });
            if (!user) throw new NotFoundException('User not found');
        }

        if (dto.type === WalletType.VESSEL && dto.vesselId) {
            vessel = await this.vesselRepo.findOne({ where: { id: dto.vesselId } });
            if (!vessel) throw new NotFoundException('Vessel not found');
        }

        const secret = randomBytes(32).toString('hex');
        const address = randomBytes(20).toString('hex');

        const wallet = this.walletRepo.create({
            type: dto.type,
            owner: user ?? undefined,
            vessel: vessel ?? undefined,
            ownerId: user?.id,
            vesselId: vessel?.id,
            address,
            secret,
        });

        return this.walletRepo.save(wallet);
    }

    async getWallet(walletId: string): Promise<Wallet> {
        const wallet = await this.walletRepo.findOne({ where: { id: walletId } });
        if (!wallet) throw new NotFoundException('Wallet not found');
        return wallet;
    }

    async tokenizeVessel(dto: TokenizeVesselDto) {
        const vessel = await this.vesselRepo.findOne({ where: { id: dto.vesselId } });
        if (!vessel) throw new NotFoundException('Vessel not found');
        if (vessel.tokenizationStatus === 'tokenized') throw new BadRequestException('Vessel already tokenized');

        // Normally: integrate XRPL SDK here to issue token, set address & tx hash
        const tokenCode = `VSL-${Math.floor(Math.random() * 1000000)}`;
        const vesselWalletAddress = randomBytes(20).toString('hex');
        const txHash = randomBytes(16).toString('hex');

        vessel.tokenCode = tokenCode;
        vessel.tokenSupply = dto.tokenSupply;
        vessel.vesselWalletAddress = vesselWalletAddress;
        vessel.tokenIssuerAddress = 'ISSUER-' + randomBytes(10).toString('hex');
        vessel.tokenizationTxHash = txHash;
        vessel.tokenizationDate = new Date();
        vessel.tokenizationFeeUsd = dto.feeUsd;
        vessel.tokenizationStatus = 'tokenized';

        return this.vesselRepo.save(vessel);
    }

    async getVesselTokenInfo(vesselId: string): Promise<Vessel> {
        const vessel = await this.vesselRepo.findOne({ where: { id: vesselId } });
        if (!vessel) throw new NotFoundException('Vessel not found');
        return vessel;
    }

    /** Transfer token between wallets */
    async transferToken(dto: TransferTokenDto) {
        return this.dataSource.transaction(async manager => {
            const fromWallet = await manager.findOne(Wallet, { where: { id: dto.fromWalletId } });
            const toWallet = await manager.findOne(Wallet, { where: { id: dto.toWalletId } });

            if (!fromWallet || !toWallet) throw new NotFoundException('Wallet not found');
            if (fromWallet.balance < dto.amount) throw new BadRequestException('Insufficient balance');

            fromWallet.balance -= dto.amount;
            toWallet.balance += dto.amount;

            await manager.save([fromWallet, toWallet]);
            return { fromWallet, toWallet };
        });
    }

    /** Fractionalize vessel token */
    async fractionalizeVessel(vesselId: string, dto: FractionalizeDto): Promise<Wallet[]> {
        const vessel = await this.dataSource.getRepository(Vessel).findOne({ where: { id: vesselId } });
        if (!vessel) throw new NotFoundException('Vessel not found');
        if (vessel.tokenizationStatus !== 'tokenized') throw new BadRequestException('Vessel not tokenized');
        if (!vessel.tokenSupply) throw new BadRequestException('Vessel token supply is not set');

        const totalSupply = vessel.tokenSupply;
        const fractionAmount = totalSupply / dto.fractions;

        const walletsToAllocate = dto.allocations ?? [];

        return this.dataSource.transaction(async manager => {
            const allocations: Wallet[] = [];

            if (walletsToAllocate.length === 0) {
                // Default: Eşit paylaştır, tüm tokenler vessel wallet'ta
                const vesselWallet = await manager.findOne(Wallet, { where: { vesselId: vessel.id } });
                if (!vesselWallet) throw new NotFoundException('Vessel wallet not found');

                vesselWallet.balance = totalSupply;
                allocations.push(vesselWallet);
            } else {
                // Custom allocation
                for (const alloc of walletsToAllocate) {
                    const wallet = await manager.findOne(Wallet, { where: { id: alloc.walletId } });
                    if (!wallet) throw new NotFoundException(`Wallet ${alloc.walletId} not found`);

                    // Eğer amount belirtilmemişse fractionAmount kullan
                    wallet.balance = alloc.amount ?? fractionAmount;
                    allocations.push(wallet);
                }
            }

            // DB'ye kaydet
            await manager.save(Wallet, allocations);
            return allocations;
        });
    }

    /** Get wallet balance */
    async getWalletBalance(walletId: string) {
        const wallet = await this.walletRepo.findOne({ where: { id: walletId } });
        if (!wallet) throw new NotFoundException('Wallet not found');
        return { walletId: wallet.id, balance: wallet.balance };
    }
}