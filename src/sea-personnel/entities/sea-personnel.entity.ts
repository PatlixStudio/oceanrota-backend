import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sea_personnel')
export class SeaPersonnel {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Captain James Cook' })
  @Column()
  fullName: string;

  @ApiProperty({ example: 'captain.cook@fleet.io' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'Captain' })
  @Column()
  position: string; // e.g. Captain, Engineer, Cook

  @ApiProperty({ example: 15, required: false })
  @Column({ nullable: true })
  experienceYears: number;

  @ApiProperty({ example: 'Master Mariner, Navigation Expert', required: false })
  @Column({ nullable: true })
  certifications: string;

  @ApiProperty({ example: 'Available', required: false })
  @Column({ nullable: true })
  availability: string; // e.g. "Available", "At sea until Nov"

  @ApiProperty({ example: 'Singapore', required: false })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: false })
  @Column({ default: false })
  isSeeded: boolean; // renamed flag

  @ApiProperty({ example: '2025-10-12T12:34:56.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-10-12T12:34:56.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
