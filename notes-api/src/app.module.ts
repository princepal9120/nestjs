import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

import { UserService } from './user/user.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';



@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService, PrismaService],
})
export class AppModule { }
