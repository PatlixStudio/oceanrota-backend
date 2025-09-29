// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe', description: 'Username of the user, usually firstName.lastName' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ example: 'Software developer & sailor', description: 'User bio', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: '1990-05-15', description: 'Birthday', required: false })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiProperty({ example: 'user', description: 'Role of the user', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
