import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCrewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  experienceYears?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certifications?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  availability?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
