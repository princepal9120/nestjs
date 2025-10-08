import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoModule } from './s/co/co.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [AuthModule, CoModule, CrudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
