import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '2025-11-10T09:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  scheduleDate?: string;

  @ApiProperty({ example: 'Please bring safety certificate', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
