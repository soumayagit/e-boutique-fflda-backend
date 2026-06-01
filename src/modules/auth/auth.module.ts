import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/use-cases/auth.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { RefreshStrategy } from './infrastructure/strategies/refresh.strategy';
import { PrismaAuthRepository } from './infrastructure/adapters/prisma-auth.repository';
import { AUTH_REPOSITORY } from './domain/ports/auth.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET') as string,
        signOptions: { expiresIn: '15m' as any },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    RefreshStrategy,
    { provide: AUTH_REPOSITORY, useClass: PrismaAuthRepository },
  ],
  exports: [AuthService, AUTH_REPOSITORY],
})
export class AuthModule {}