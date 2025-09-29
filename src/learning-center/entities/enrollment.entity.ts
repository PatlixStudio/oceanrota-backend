import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('enrollments')
export class Enrollment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: () => Course })
  @ManyToOne(() => Course, { eager: true })
  course!: Course;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, { eager: true })
  student!: User;

  @ApiProperty({ example: 'active' })
  @Column({ default: 'active' })
  status!: 'active' | 'completed' | 'canceled';

  @ApiProperty()
  @CreateDateColumn()
  enrolledAt!: Date;
}
