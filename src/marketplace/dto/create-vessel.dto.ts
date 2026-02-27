import { IsOptional, IsString, IsNumber, Min, Max, IsArray, IsObject, ValidateNested, IsNotEmpty, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEngineDto } from './create-engine.dto';

export class CreateVesselDto {
  @IsString()
  vesselName!: string;

  @IsOptional()
  @IsString()
  vesselType?: string;

  @IsOptional()
  @IsString()
  vesselClass?: string;

  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsNotEmpty()
  @IsString()
  category!: string; // Power / Sail / Other

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
  registryNumber?: string;

  @IsOptional()
  @IsString() 
  @Matches(/^IMO\s?\d{7}$/)
  imoNumber?: string;

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

  /** Address for the vessel */
  @IsOptional()
  @IsObject()
  address?: {
    address_1?: string;
    address_2?: string;
    country?: string;
    city?: string;
    port?: string;
    statet?: string;
    postal_code?: string;
  };
}
