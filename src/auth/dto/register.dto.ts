import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ description: 'First name of the user', example: 'John.Doe' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ description: 'Password of the user', example: 'P@ssword123' })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}