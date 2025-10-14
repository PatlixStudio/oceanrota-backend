import { IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVesselDto } from './create-vessel.dto';

export class CreateListingDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  category!: string; // Power / Sail / Other

  @IsNotEmpty()
  @IsString()
  listingType!: string; // Sale / Rent / Both

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isSeed?: boolean;

  /** Nested Vessel DTO */
  @ValidateNested()
  @Type(() => CreateVesselDto)
  vessel!: CreateVesselDto;

  /** Ownership (optional, usually from auth) */
  @IsOptional()
  @IsNumber()
  ownerId?: number;
}
