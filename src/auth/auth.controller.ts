import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered' })
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto.email, dto.password, dto.name);
      return { message: 'registered', user };
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Registration failed');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
