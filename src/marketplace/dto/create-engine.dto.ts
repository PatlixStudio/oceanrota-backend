import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateEngineDto {
  @IsOptional()
  @IsString()
  brand!: string;

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
  @IsNumber() 
  hours?: number;
}
