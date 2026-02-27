import { IsNotEmpty, IsOptional, IsString, IsNumber, Min, IsBoolean, ValidateNested, IsEnum, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVesselDto } from './create-vessel.dto';
import { FeaturedPlan, ListingPurpose, ListingStatus, ListingVisibility } from 'src/common/enums/listing-enums';

export class CreateListingDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  category?: string; // Power / Sail / Other

  @IsNotEmpty()
  @IsString()
  listingPurpose!: ListingPurpose; // Sale / Rent / All

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

  /** Location */
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() port?: string;

  /** Visibility & Promotion */
  @IsOptional() @IsEnum(ListingVisibility)
  visibilityType?: ListingVisibility;

  @IsOptional() @IsEnum(FeaturedPlan)
  featuredPlan?: FeaturedPlan;

  @IsOptional() @IsDate()
  @Type(() => Date)
  featuredUntil?: Date;
  
  @IsOptional() @IsBoolean() featured?: boolean;

  /** Images */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

    /** file name stored after upload */
  @IsOptional() @IsString() featuredImage?: string;

   /** Status */
  @IsOptional() @IsEnum(ListingStatus)
  status?: ListingStatus;

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
