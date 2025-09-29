import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  category!: string; // e.g. boat, equipment, service

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ nullable: true })
  location?: string;

  @ManyToOne(() => User, (user) => user.id)
  owner!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
