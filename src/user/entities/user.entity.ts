// user.entity.ts
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string; // e.g., firstName.lastName

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phoneNumber!: string;

  @Exclude()
  @Column()
  passwordHash!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  fullName?: string; // optional, can be derived from firstName + lastName

  @Column({ nullable: true })
  avatarUrl?: string; // user profile picture

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @Column({ default: 'user' })
  role!: string;

  @Column({ nullable: true })
  walletAddress?: string;   // Public address of the user's wallet

  @Exclude()
  @Column({ nullable: true })
  walletSecret?: string;    // Secret/seed for the wallet (keep securely!)
  
  @Exclude()
  @Column({ type: 'decimal', nullable: true })
  walletBalance?: number;   // Optional: track balance in XRP or platform token

  @Column({ default: false })
  isWalletCreated!: boolean;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
