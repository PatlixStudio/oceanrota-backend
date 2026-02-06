import { IsOptional, IsString, IsNumber, Min, Max, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEngineDto } from './create-engine.dto';

export class CreateVesselDto {
  @IsString()
  vesselName!: string;

  @IsOptional()
  @IsString()
  boatType?: string;

  @IsOptional()
  @IsString()
  boatClass?: string;

  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  length_m?: number;

  @IsOptional()
  @IsNumber()
  beam_m?: number;

  @IsOptional()
  @IsNumber()
  draft_m?: number;

  @IsOptional()
  @IsNumber()
  weight_kg?: number;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year?: number;

  @IsOptional()
  @IsString()
  condition?: string;

  @IsOptional()
  @IsString()
  hullMaterial?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsNumber()
  guestCabins?: number;

  @IsOptional()
  @IsNumber()
  guestHeads?: number;

  @IsOptional()
  @IsNumber()
  fuelTank_liter?: number;

  @IsOptional()
  @IsNumber()
  waterTank_liter?: number;

  @IsOptional()
  @IsNumber()
  holdingTank_liter?: number;

  @IsOptional()
  @IsObject()
  features?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  /** Engines array */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEngineDto)
  engines?: CreateEngineDto[];
}
