import { IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferTokenDto {
  @ApiProperty({ description: 'Sender wallet ID' })
  @IsNotEmpty()
  @IsString()
  fromWalletId!: string;

  @ApiProperty({ description: 'Recipient wallet ID' })
  @IsNotEmpty()
  @IsString()
  toWalletId!: string;

  @ApiProperty({ description: 'Amount to transfer' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount!: number;
}
