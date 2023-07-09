import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // # SWAGGER SETUP # //
    const config = new DocumentBuilder().setTitle('Randomizer API').setDescription('The randomizer API description').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // # VALIDATION PIPE # //
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await app.listen(3000);
}

bootstrap();
