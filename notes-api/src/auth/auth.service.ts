import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { exit } from 'process';
import { IsStrongPassword } from 'class-validator';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }
    async register(registerDto: RegisterDto) {
        // Check if user already exists
        const existingUser = await this.userService.getUserByEmail(registerDto.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password before creating user
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const userData = { ...registerDto, password: hashedPassword };

        const user = await this.userService.createUser(userData);
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, email: user.email, name: user.name }
        };
    }

    async login(loginDto: LoginDto) {
        // get the user from db exit
        // match the password 
        // crate the jwt token and return 
        const user = await this.userService.getUserByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException("email or password not exist. ")
        }

        const match = await bcrypt.compare(loginDto.password, user.password)
        if (!match) {
            throw new UnauthorizedException("email or password not exist. ")
        }
        const payload = { sub: user.id, email: user.email }
        this.logger.log("new user login successfully.")
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
