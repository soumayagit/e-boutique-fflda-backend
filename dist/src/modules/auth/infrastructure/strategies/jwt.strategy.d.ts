import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { IAuthRepository } from '../../domain/ports/auth.repository';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authRepo;
    constructor(config: ConfigService, authRepo: IAuthRepository);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        role: import("../../domain/entities/user.entity").Role;
    }>;
}
export {};
