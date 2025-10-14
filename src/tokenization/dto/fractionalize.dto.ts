import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FractionalizeDto {
  @ApiProperty({ description: 'Number of fractions to create' })
  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  fractions!: number;

  @ApiProperty({ description: 'Optional list of initial wallet allocations', required: false })
  allocations?: { walletId: string; amount: number }[];
}
