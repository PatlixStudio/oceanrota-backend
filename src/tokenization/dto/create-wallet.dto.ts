import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WalletType } from '../entities/wallet.entity';

export class CreateWalletDto {
  @ApiProperty({ enum: WalletType, description: 'Type of wallet' })
  @IsEnum(WalletType)
  type!: WalletType;

  @ApiProperty({ required: false, description: 'User ID for user wallet' })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiProperty({ required: false, description: 'Vessel ID for vessel wallet' })
  @IsOptional()
  @IsString()
  vesselId?: string;
}
