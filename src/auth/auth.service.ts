import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async register(email: string, password: string, name?: string) {
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException('User already exists');

    const hash = await this.hashPassword(password);
    const user = this.userRepo.create({ email, passwordHash: hash, name });
    await this.userRepo.save(user);

    const { passwordHash, ...publicUser } = user;
    return publicUser;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await this.validatePassword(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async forgotPassword(email: string) {
    // TODO: Implement Forgot Password Logic
  }

  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
}
