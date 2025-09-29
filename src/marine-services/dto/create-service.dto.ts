import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Engine overhaul' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Complete engine service for 200-500 HP engines' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'maintenance' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 1200, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 'Istanbul Shipyard', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
