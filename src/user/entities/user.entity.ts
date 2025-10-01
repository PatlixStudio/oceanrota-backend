// user.entity.ts
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

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
