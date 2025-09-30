import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  category!: string; // Power / Sail / Other

  @Column()
  boatClass!: string; // e.g., Cruiser, Motor Yacht, Trawler

  @Column()
  make!: string; // e.g., Sea Ray, Beneteau

  @Column()
  boatType!: string; // Sailboat, Motorboat, Yacht, etc.

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ nullable: true })
  currency?: string; // USD, EUR, etc.

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  port?: string;

  @Column({ type: 'decimal', nullable: true })
  length_m?: number;

  @Column({ nullable: true })
  year?: number;

  @Column({ nullable: true })
  condition?: string; // New, Excellent, Good, etc.

  @Column('text', { array: true, nullable: true })
  images?: string[];

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @Column()
  ownerId!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
