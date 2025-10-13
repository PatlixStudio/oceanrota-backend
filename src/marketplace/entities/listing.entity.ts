import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Engine } from './engine.entity';

export enum ListingStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SOLD = 'sold',
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  /** Basic Info */
  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  category!: string; // e.g., Power / Sail / Other

  @Column({ nullable: true })
  listingType!: string;

  @Column({ nullable: true })
  boatType?: string; // e.g., Catamaran, Yacht

  @Column({ nullable: true })
  boatClass?: string; // e.g., Cruiser, Motor Yacht

  @Column({ nullable: true })
  make?: string; // e.g., Beneteau

  @Column({ nullable: true })
  model?: string; // e.g., 47 Power

  /** Pricing */
  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ nullable: true })
  currency?: string; // USD, EUR, etc.

  /** Location */
  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  port?: string;

  /** Specifications */
  @Column({ type: 'decimal', nullable: true })
  length_m?: number;

  @Column({ type: 'decimal', nullable: true })
  beam_m?: number;

  @Column({ type: 'decimal', nullable: true })
  draft_m?: number;

  @Column({ type: 'decimal', nullable: true })
  weight_kg?: number;

  @Column({ nullable: true })
  year?: number;

  @Column({ nullable: true })
  condition?: string; // New / Excellent / Used

  @Column({ nullable: true })
  hullMaterial?: string; // e.g., Fiberglass

  @Column({ nullable: true })
  capacity?: string; // e.g., "8 people"

  /** Accommodations */
  @Column({ type: 'int', nullable: true })
  guestCabins?: number;

  @Column({ type: 'int', nullable: true })
  guestHeads?: number;

  /** Tanks (in gallons) */
  @Column({ type: 'decimal', nullable: true })
  fuelTank_liter?: number;

  @Column({ type: 'decimal', nullable: true })
  waterTank_liter?: number;

  @Column({ type: 'decimal', nullable: true })
  holdingTank_liter?: number;

  /** Relations */
  @OneToMany(() => Engine, (engine) => engine.listing, {
    cascade: true,
    eager: true,
  })
  engines?: Engine[];

  /** Features (flexible JSON field for custom specs) */
  @Column({ type: 'jsonb', nullable: true })
  features?: Record<string, any>;

  /** Media */
  @Column('text', { array: true, nullable: true })
  images?: string[];

  /** Status */
  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.DRAFT,
  })
  status!: ListingStatus;

  /** Owner Relation */
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @Column()
  ownerId!: number;

  /** Flags */
  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isSeeded!: boolean;

  /** Timestamps */
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
