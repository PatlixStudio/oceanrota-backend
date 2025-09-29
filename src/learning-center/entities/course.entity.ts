import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('courses')
export class Course {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'STCW Basic Safety Training' })
  @Column()
  title!: string;

  @ApiProperty({ example: 'Mandatory safety training for seafarers' })
  @Column({ type: 'text' })
  description!: string;

  @ApiProperty({ example: 'safety' })
  @Column()
  category!: string;

  @ApiProperty({ example: 300 })
  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, { eager: true })
  instructor!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
