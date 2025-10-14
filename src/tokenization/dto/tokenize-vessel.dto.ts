import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenizeVesselDto {
  @ApiProperty({ description: 'Vessel ID to tokenize' })
  @IsNotEmpty()
  @IsString()
  vesselId!: string;

  @ApiProperty({ description: 'Token supply (total number of tokens)' })
  @IsNotEmpty()
  @IsNumber()
  tokenSupply!: number;

  @ApiProperty({ description: 'Platform fee in USD for tokenization' })
  @IsNotEmpty()
  @IsNumber()
  feeUsd!: number;
}
