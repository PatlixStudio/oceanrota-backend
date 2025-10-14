import { Module } from '@nestjs/common';
import { TokenizationService } from './tokenization.service';
import { TokenizationController } from './tokenization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Vessel } from 'src/marketplace/entities/vessel.entity';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vessel, Wallet])],
  providers: [TokenizationService],
  controllers: [TokenizationController],
  exports: [TokenizationService]
})
export class TokenizationModule { }
