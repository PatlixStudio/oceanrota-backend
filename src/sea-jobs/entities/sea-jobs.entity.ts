import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sea_jobs')
export class SeaJob {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Captain for Cargo Ship' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Responsible for navigating the cargo vessel.' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'Captain' })
  @Column()
  position: string;

  @ApiProperty({ example: 'Singapore', required: false })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: 10, required: false })
  @Column({ nullable: true })
  requiredExperience: number;

  @ApiProperty({ example: ['Master Mariner', 'Navigation Expert'], required: false })
  @Column('simple-array', { nullable: true })
  certifications: string[];

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: false })
  @Column({ default: false })
  isSeed: boolean; // flag for seeded data

  @ApiProperty({ example: '2025-10-12T12:34:56.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-10-12T12:34:56.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
