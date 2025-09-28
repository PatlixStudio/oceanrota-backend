import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // You can override handleRequest for custom errors
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      return null; // let Nest handle unauthorized via built-in filters
    }
    return user;
  }
}
