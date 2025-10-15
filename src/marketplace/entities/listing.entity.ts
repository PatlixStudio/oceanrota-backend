import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Vessel } from './vessel.entity';

export enum ListingStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SOLD = 'sold',
}

export enum ListingType{
  ALL = 'All',
  RENT = 'Rent',
  SELL = 'Sale',
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  /** Marketplace display info */
  @Column()
  title!: string;           // marketing title

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ nullable: true })
  currency?: string;

  @Column({ default: 'draft', type: 'enum', enum: ListingStatus })
  status!: ListingStatus;

  @Column({ default: 'All', type: 'enum', enum: ListingType })
  listingType!: ListingType;

  /** Owner */
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner!: User;
  @Column() ownerId: number;

  /** Relation to Vessel */
  @ManyToOne(() => Vessel, { eager: true, cascade: true })
  @JoinColumn({ name: 'vesselId' })
  vessel!: Vessel;
  @Column({ nullable: true }) vesselId: string;

  /** Featured / Promotion Flags */
  @Column({ default: false })
  isFeatured!: boolean;       // Highlighted listing on homepage or search

  @Column({ type: 'decimal', nullable: true })
  featuredFeeUsd?: number;    // Fee paid to be featured

  @Column({ default: false })
  isNewArrival!: boolean;     // Recently added listing

  @Column({ default: false })
  isPriceReduced!: boolean;   // Show “Price Drop” badge

  @Column({ default: false })
  isVerified!: boolean;       // Platform-verified owner/vessel

  @Column({ type: 'timestamp', nullable: true })
  featuredUntil?: Date;       // Optional expiry date for featured promotion

  /** Optional flags */
  @Column({ default: true }) isActive!: boolean;
  @Column({ default: false }) isSeed!: boolean;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
