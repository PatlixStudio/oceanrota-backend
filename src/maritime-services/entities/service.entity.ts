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

@Entity('marine_services')
export class MaritimeService {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Hull repair and painting' })
  @Column()
  title!: string;

  @ApiProperty({ example: 'Full hull inspection, minor repairs and repainting' })
  @Column({ type: 'text' })
  description!: string;

  @ApiProperty({ example: 'maintenance' })
  @Column()
  category!: string;

  @ApiProperty({ example: 1500, description: 'Fixed price or base price' })
  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @ApiProperty({ example: 'Marina Bay, Singapore' })
  @Column({ nullable: true })
  location?: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => (user as any).id, { eager: true })
  provider!: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
