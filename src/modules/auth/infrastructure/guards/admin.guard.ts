import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

// Rôles autorisés à accéder aux routes admin.
// Adaptez cette liste si votre logique métier diffère
// (ex: retirer MANAGER si seuls ADMIN/SUPER_ADMIN doivent valider des commandes).
const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN', 'MANAGER'];

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !ADMIN_ROLES.includes(user.role)) {
      throw new ForbiddenException(
        'Accès réservé aux administrateurs',
      );
    }

    return true;
  }
}