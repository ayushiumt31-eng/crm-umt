import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('Enterprise CRM Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 Server Running : http://localhost:${process.env.PORT ?? 3000}`,
  );

  console.log(
    `📚 Swagger Docs : http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}

bootstrap();