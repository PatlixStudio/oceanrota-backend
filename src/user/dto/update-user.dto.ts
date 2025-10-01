import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsDateString, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john.doe', description: 'Username of the user' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'newemail@example.com', description: 'Email address of the user' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+90 987 654 32 10', description: 'Phone number of the user' })
  @IsPhoneNumber()
  @IsString()
  phoneNumber!: string;

  @ApiPropertyOptional({ example: 'John', description: 'First name of the user' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'Full name of the user' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL of the user' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'Sailor and software developer', description: 'Bio of the user' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: '1990-05-15', description: 'Birthday of the user' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({ example: 'newPassword123', description: 'New password of the user' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'user', description: 'Role of the user' })
  @IsOptional()
  @IsString()
  role?: string;
}
