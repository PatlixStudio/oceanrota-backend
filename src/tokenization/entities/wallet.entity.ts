import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Vessel } from 'src/marketplace/entities/vessel.entity';

export enum WalletType {
    USER = 'user',
    VESSEL = 'vessel',
}

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'enum', enum: WalletType })
    type!: WalletType;

    @Column({ nullable: true })
    ownerId?: number;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'ownerId' })
    owner?: User;

    @Column({ nullable: true })
    vesselId?: string;

    @ManyToOne(() => Vessel, { eager: true })
    @JoinColumn({ name: 'vesselId' })
    vessel?: Vessel;

    @Column()
    address!: string;
    
    @Column({ type: 'decimal', default: 0 })
    balance!: number; // token balance in this wallet

    @Column()
    secret!: string; // store encrypted in production

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
