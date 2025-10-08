import { Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {


    constructor(private readonly prismaService: PrismaService) {}
    async getUserByEmail(email: string) {
        const user = await this.prismaService.user.findFirst({ where: { email } });
        return user;
    }

    async createUser(registerDto: RegisterDto) {
        return await this.prismaService.user.create({data: registerDto})
    }

}
