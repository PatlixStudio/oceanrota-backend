// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
