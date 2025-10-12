import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateSeaJobDto {
    @ApiProperty({ example: 'Captain for Cargo Ship' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Responsible for navigating the cargo vessel.', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'Captain' })
    @IsString()
    position: string;

    @ApiProperty({ example: 'Singapore', required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ example: 10, required: false })
    @IsOptional()
    @IsNumber()
    requiredExperience?: number;

    @ApiProperty({ example: ['Master Mariner', 'Navigation Expert'], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    certifications?: string[];

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isSeed?: boolean;
}
