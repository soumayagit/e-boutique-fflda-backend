// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from '../../mail/mail.module';
import { PrismaService }        from '../../prisma/prisma.service';
import { AuthController }       from './presentation/auth.controller';
import { AuthService }          from './application/use-cases/auth.service';
import { JwtStrategy }          from './infrastructure/strategies/jwt.strategy';
import { RefreshStrategy }      from './infrastructure/strategies/refresh.strategy';
import { PrismaAuthRepository } from './infrastructure/adapters/prisma-auth.repository';
import { AUTH_REPOSITORY }      from './domain/ports/auth.repository';

@Module({
  imports: [
    MailModule,
    ConfigModule,
    PassportModule,
  JwtModule.registerAsync({
  imports:    [ConfigModule],
  inject:     [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret:      config.get<string>('JWT_ACCESS_SECRET'),
    signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRY', '15m') as any },
  }),
}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshStrategy,
    PrismaService,
    {
      provide:  AUTH_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}