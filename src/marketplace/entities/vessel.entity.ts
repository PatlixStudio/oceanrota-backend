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
import { Address } from 'src/common/embedables/address.embedded';

@Entity('vessels')
export class Vessel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Official Vessel Info */
  @Column() vesselName: string;           // official name
  @Column({ nullable: true }) category?: string;            // Power / Sail / Other
  @Column({ nullable: true }) vesselType?: string;    // Catamaran, Yacht
  @Column({ nullable: true }) vesselClass?: string;   // Cruiser, Motor Yacht
  @Column({ nullable: true }) make?: string;        // Beneteau
  @Column({ nullable: true }) model?: string;       // 47 Power
  @Column({ nullable: true }) registryNumber?: string;
  @Column({ nullable: true }) imoNumber?: string;
  @Column({ nullable: true }) condition?: string;   // New / Excellent / Used
  @Column({ type: 'decimal', nullable: true }) length_m?: number;
  @Column({ type: 'decimal', nullable: true }) beam_m?: number;
  @Column({ type: 'decimal', nullable: true }) draft_m?: number;
  @Column({ type: 'decimal', nullable: true }) weight_kg?: number;
  @Column({ nullable: true }) year?: number;
  @Column({ nullable: true }) hullMaterial?: string;
  @Column({ nullable: true }) capacity?: number;

  /** Location & Registration */
  @Column(() => Address, { prefix: 'vessel_address_' })
  address?: Address;

  /** Accommodations */
  @Column({ type: 'int', nullable: true }) guestCabins?: number;
  @Column({ type: 'int', nullable: true }) guestHeads?: number;

  /** Tanks */
  @Column({ type: 'decimal', nullable: true }) fuelTank_liter?: number;
  @Column({ type: 'decimal', nullable: true }) waterTank_liter?: number;
  @Column({ type: 'decimal', nullable: true }) holdingTank_liter?: number;

  /** Features */
  @Column({ type: 'jsonb', nullable: true }) features?: Record<string, any>;

  /** Media */
  @Column('text', { array: true, nullable: true, default: [] }) images?: string[];

  /** Engines */
  @OneToMany(() => Engine, (engine) => engine.vessel, {
    cascade: true,
    eager: true,
  })
  engines?: Engine[];

  /** Ownership */
  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'ownerId' })
  owner!: User;

  @Column() ownerId: number;

  /** Blockchain / Tokenization */
  @Column({ nullable: true }) tokenCode?: string;
  @Column({ nullable: true }) tokenSupply?: number;
  @Column({ nullable: true }) vesselWalletAddress?: string;
  @Column({ nullable: true }) tokenIssuerAddress?: string;
  @Column({ nullable: true }) tokenizationTxHash?: string;
  @Column({ nullable: true }) tokenizationDate?: Date;
  @Column({ type: 'decimal', nullable: true }) tokenizationFeeUsd?: number;

  @Column({ default: false }) isTokenized!: boolean;

  @Column({
    type: 'enum',
    enum: ['not_tokenized', 'pending', 'tokenized', 'failed'],
    default: 'not_tokenized',
  })
  tokenizationStatus: 'not_tokenized' | 'pending' | 'tokenized' | 'failed';

  /** Flags */
  @Column({ default: true }) isActive!: boolean;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
