import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Marine Navigation Basics' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Introduction to maritime navigation systems' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'navigation' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}
