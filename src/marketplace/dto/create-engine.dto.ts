import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateEngineDto {
  @IsOptional()
  @IsString()
  engineMake?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  horsepower?: number;

  @IsOptional()
  @IsString()
  driveType?: string;

  @IsOptional()
  @IsString()
  fuelType?: string;

  @IsOptional()
  @IsString()
  engineHours?: string;
}
