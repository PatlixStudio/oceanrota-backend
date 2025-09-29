import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sea_personnel')
export class SeaPersonnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  position: string; // e.g. Captain, Engineer, Cook

  @Column({ nullable: true })
  experienceYears: number;

  @Column({ nullable: true })
  certifications: string; // could later be normalized into another table

  @Column({ nullable: true })
  availability: string; // e.g. "Available", "At sea until Nov"

  @Column({ nullable: true })
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
