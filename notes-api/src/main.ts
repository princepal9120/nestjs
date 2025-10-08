import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Notes Api Documentation')
    .setDescription('The Notes API description')
    .setVersion('1.0')
    .addTag('Notes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
