import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'https://app-blog-red.vercel.app'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Blog - API')
    .setDescription(
      'Essa é a documentação da API utilizada no Blog (https://app-blog-red.vercel.app/)',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  const PORT = process.env.PORT || 3001;

  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
