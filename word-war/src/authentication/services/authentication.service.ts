import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async loginService(
        username: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findUserService(username);
        if (!user || !(await argon2.verify(user.password, password))) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async registerService(username: string, password: string): Promise<{ access_token: string }> {
        try {
            const hashedPassword = await argon2.hash(password);
            const user = await this.userService.createUserService(username, hashedPassword);
            if ('message' in user) {
                throw new UnauthorizedException(user.message);
            }
            const payload = { sub: user._id, username: user.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}