import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { url, method } = request;

    // Excluir rutas específicas
    const excludedRoutes = [
      { path: '/auth/login', method: 'POST' },
      { path: '/auth/register', method: 'POST' },
      { path: '/auth/transactions', method: 'POST' },
    ];

    const isExcluded = excludedRoutes.some(
      (route) => url.startsWith(route.path) && method === route.method,
    );

    if (isExcluded) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
