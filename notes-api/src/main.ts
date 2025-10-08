import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger ({ 
      colors: true,
      json: true,
    })
  });
 
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically remove properties that are not in the DTO
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to DTO instances
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
