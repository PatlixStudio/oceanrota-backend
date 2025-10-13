import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsBoolean,
  IsObject,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateListingDto {
  /** Basic Info */
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
  listingType!: string; // Power / Sail / Other

  @IsOptional()
  @IsString()
  boatType?: string; // Sailboat, Yacht, etc.

  @IsOptional()
  @IsString()
  boatClass?: string; // Cruiser, Motor Yacht, etc.

  @IsOptional()
  @IsString()
  make?: string; // Sea Ray, Beneteau, etc.

  @IsOptional()
  @IsString()
  model?: string; // 47 Power

  /** Pricing */
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  currency?: string; // USD, EUR, etc.

  /** Location */
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  port?: string;

  /** Specifications */
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
  condition?: string; // New, Used, etc.

  @IsOptional()
  @IsString()
  hullMaterial?: string; // Fiberglass, Aluminum, etc.

  @IsOptional()
  @IsString()
  capacity?: string; // e.g., "8 people"

  /** Accommodation */
  @IsOptional()
  @IsNumber()
  guestCabins?: number;

  @IsOptional()
  @IsNumber()
  guestHeads?: number;

  /** Tanks */
  @IsOptional()
  @IsNumber()
  fuelTank_liter?: number;

  @IsOptional()
  @IsNumber()
  waterTank_liter?: number;

  @IsOptional()
  @IsNumber()
  holdingTank_liter?: number;

  /** Features & Media */
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  /** Ownership */
  @IsOptional()
  @IsNumber()
  ownerId?: number;

  /** Flags */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isSeeded?: boolean;
}
