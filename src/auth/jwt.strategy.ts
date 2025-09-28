import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'dev_jwt_secret', // use env in prod
    });
  }

  async validate(payload: any) {
    // payload.sub is user id
    const user = await this.authService.findById(payload.sub);
    // You can return whatever you want injected into Request.user
    return user ? { id: user.id, email: user.email, role: user.role } : null;
  }
}
