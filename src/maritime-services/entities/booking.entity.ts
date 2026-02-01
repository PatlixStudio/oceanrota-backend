import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { MaritimeService } from './service.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('service_bookings')
export class ServiceBooking {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: () => MaritimeService })
  @ManyToOne(() => MaritimeService, { eager: true })
  service!: MaritimeService;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, { eager: true })
  client!: User;

  @ApiProperty({ example: 'pending' })
  @Column({ default: 'pending' })
  status!: 'pending' | 'confirmed' | 'completed' | 'canceled';

  @ApiProperty({ example: '2025-11-10T09:00:00Z' })
  @Column({ type: 'timestamp', nullable: true })
  scheduleDate?: Date;

  @ApiProperty({ example: 'Please bring diving gear' })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;
}
