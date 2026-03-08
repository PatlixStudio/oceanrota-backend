import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Vessel } from './vessel.entity';
import { FeaturedPlan, ListingStatus, ListingPurpose } from 'src/common/enums/listing-enums';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  /** Marketplace display info */
  @Column()
  title!: string;           // marketing title

  @Column({ type: 'text' })
  description!: string;

  @Column({ nullable: true }) 
  category!: string;

  @Column({ type: 'decimal', nullable: true })
  salePrice?: number;

  @Column({ type: 'decimal', nullable: true })
  rentPrice?: number;

  @Column({ nullable: true })
  currency?: string;

  @Column({ nullable: true })
  visibilityType!: string; // e.g. 'STANDARD', 'PREMIUM', 'EXCLUSIVE'

  @Column({ type: 'enum', enum: ListingStatus, default: ListingStatus.DRAFT, })
  status!: ListingStatus;

  @Column({ type: 'enum', enum: ListingPurpose, default: 'ALL' })
  listingType!: ListingPurpose;

  /** Owner */
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner!: User;
  @Column() ownerId: number;

  /** Relation to Vessel */
  @OneToOne(() => Vessel, { eager: true, cascade: true })
  @JoinColumn({ name: 'vesselId' })
  vessel!: Vessel;

  @Column({ nullable: true }) vesselId: string;

  /** Featured / Promotion Flags */
  @Column({ default: false })
  isFeatured!: boolean;       // Highlighted listing on homepage or search


  @Column({ type: 'enum', enum: FeaturedPlan, default: null, nullable: true})
  featuredPlan?: FeaturedPlan;
  
  @Column({ type: 'timestamp', nullable: true })
  featuredUntil?: Date;       // Optional expiry date for featured promotion

  @Column({ default: false })
  isNewArrival!: boolean;     // Recently added listing

  @Column({ default: false })
  isPriceReduced!: boolean;   // Show “Price Drop” badge

  @Column({ default: false })
  isVerified!: boolean;       // Platform-verified owner/vessel

  /** Optional flags */
  @Column({ default: true }) isActive!: boolean;
  @Column({ default: false }) isSeed!: boolean;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
