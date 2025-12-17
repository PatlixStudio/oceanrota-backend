import { IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVesselDto } from './create-vessel.dto';
import { ListingType } from '../entities/listing.entity';

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
  listingType!: ListingType; // Sale / Rent / All

  /** mapped from salePrice */
  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  rentPrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;
  
  @IsOptional() @IsBoolean() featured?: boolean;

    /** file name stored after upload */
  @IsOptional() @IsString() featuredImage?: string;
  

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
