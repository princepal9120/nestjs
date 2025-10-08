import { Body, Controller, Post } from '@nestjs/common';


@Controller('api')
export class AuthController {
    @Post('register')
register() {
    return { message: 'User registered successfully', user: registerDto };
  }
}
  