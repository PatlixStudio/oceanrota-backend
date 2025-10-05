import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity('engines')
export class Engine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  engineMake?: string; // Volvo Penta, Yamaha, etc.

  @Column({ nullable: true })
  model?: string; // e.g., D4-300

  @Column({ type: 'int', nullable: true })
  horsepower?: number; // e.g., 300

  @Column({ nullable: true })
  driveType?: string; // e.g., V-drive, Outboard

  @Column({ nullable: true })
  fuelType?: string; // e.g., Diesel

  @Column({ nullable: true })
  engineHours?: string; // e.g., "400h"

  @ManyToOne(() => Listing, (listing) => listing.engines)
  @JoinColumn({ name: 'listingId' })
  listing!: Listing;

  @Column()
  listingId!: number;
}
