import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { IAuthRepository } from '../../domain/ports/auth.repository';
import { AUTH_REPOSITORY } from '../../domain/ports/auth.repository';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') as string,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authRepo.findById(payload.sub);
    if (!user || !user.isActive) throw new UnauthorizedException('Session invalide');
    return { id: user.id, email: user.email, role: user.role };
  }
}