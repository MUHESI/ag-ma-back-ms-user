import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async signIn(email: string, pass: string): Promise<any> {
        console.clear()
        const user = await this.userService.findOne(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        // const { password, ...result } = user;
        const payload = { id: user.id, username: user.fName };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
        // return result;

    }
}
