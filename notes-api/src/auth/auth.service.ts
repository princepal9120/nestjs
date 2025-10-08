import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
        private readonly logger= new Logger(AuthService.name)
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }
    async register(registerDto: RegisterDto) {
        /*
        check the email exist or not
        hash the password
        create the user in db
        generate the jwt token
        return the token
        */
        const user = await this.userService.getUserByEmail(registerDto.email);
        if (user) {
            throw new ConflictException('Email already exist');
        }
        const salt=10;
        const hashedPassword=await bcrypt.hash(registerDto.password,salt);

        const registerUser= await this.userService.createUser({...registerDto, password: hashedPassword})
        const payload ={ sub: registerUser.id , email: registerUser.email}
        this.logger.log("new user created successfully.")
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
        return registerUser;
    }
}
