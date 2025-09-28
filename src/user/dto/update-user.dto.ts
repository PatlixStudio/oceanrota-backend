import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'newSailor' })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiPropertyOptional({ example: 'newemail@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'New Name' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'newPassword123' })
    @IsOptional()
    @IsString()
    password?: string;
}
