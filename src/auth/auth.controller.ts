import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user and receive JWT' })
  @ApiResponse({ status: 201, description: 'User registered and logged in' })
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.authService.register(dto);
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Registration failed');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive JWT' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send Forgot Password Link' })
  async forgotPassword(@Body() dto: LoginDto) {
    return this.authService.forgotPassword(dto.email);
  }
}
