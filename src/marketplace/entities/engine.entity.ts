import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vessel } from './vessel.entity';

@Entity('engines')
export class Engine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  brand?: string; // Volvo Penta, Yamaha, etc.

  @Column({ nullable: true })
  model?: string; // e.g., D4-300

  @Column({ type: 'int', nullable: true })
  horsepower?: number; // e.g., 300

  @Column({ nullable: true })
  driveType?: string; // e.g., V-drive, Outboard

  @Column({ nullable: true })
  fuelType?: string; // e.g., Diesel

  @Column({ type: 'int', nullable: true })
  hours?: number // e.g., "400h"

  /** Relation to Vessel */
  @ManyToOne(() => Vessel, (vessel) => vessel.engines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vesselId' })
  vessel!: Vessel;

  @Column()
  vesselId!: string;
}
