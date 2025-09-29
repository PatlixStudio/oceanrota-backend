import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string) {
    if (!hash) return false; // immediately fail if hash is missing
    return bcrypt.compare(password, hash);
  }

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('User already exists');

    const hash = await this.hashPassword(dto.password);
    const user = this.userRepo.create({
      ...dto,
      passwordHash: hash,
      fullName: dto.firstName && dto.lastName ? `${dto.firstName} ${dto.lastName}` : undefined
    });

    await this.userRepo.save(user);
    // remove sensitive data
    const { passwordHash, ...publicUser } = user;

    // create JWT payload
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      message: 'Registered successfully',
      user: publicUser,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    // Friendly message if user not found or password not set
    if (!user) throw new UnauthorizedException('Email or password is incorrect');

    const valid = await this.validatePassword(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Email or password is incorrect');
    
    // remove sensitive data
    const { passwordHash, ...publicUser } = user;

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'Registered successfully',
      user: publicUser,
      accessToken: this.jwtService.sign(payload),
    };;
  }

  async forgotPassword(email: string) {
    // TODO: Implement Forgot Password Logic
  }

  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
}
