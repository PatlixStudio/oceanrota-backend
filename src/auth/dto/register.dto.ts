import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDto {
  @ApiProperty({ description: 'Email address of the user', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ description: 'Password of the user', example: 'P@ssword123' })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe', required: false })
  @IsOptional()
  name?: string;
}