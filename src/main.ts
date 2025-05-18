import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe, ShutdownSignal } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from './core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { PrismaService } from './shared';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    const logger = new Logger('Bootstrap');
    const configService = app.get(ConfigService);
    const prismaService = app.get(PrismaService);

    // Security and compression middleware
    app.use(helmet());
    app.use(compression());

    // Body parser configuration
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    // Enable Cross-Origin Resource Sharing
    app.enableCors({
      origin: configService.get('CORS_ORIGINS', '*'),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Apply global guards
    const reflector = app.get(Reflector);
    app.useGlobalGuards(
      new JwtAuthGuard(reflector),
      new RolesGuard(reflector, prismaService),
    );

    // Swagger API documentation setup
    const config = new DocumentBuilder()
      .setTitle('CSCTechies Department API')
      .setDescription('The CSCTechies Department API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Enable shutdown hooks and handle SIGTERM
    app.enableShutdownHooks();
    process.on(ShutdownSignal.SIGTERM, async () => {
      await app.close();
      process.exit(0);
    });

    const port = configService.get<number>('PORT', 3000);
    const host = configService.get<string>('HOST', '0.0.0.0');

    // Start listening for requests
    await app.listen(port, host);

    logger.log(`🎉 Environment: ${process.env.NODE_ENV}`);
    logger.log(`🚀 Application is running on: http://${host}:${port}`);
    logger.log(`📚 Swagger available at: http://${host}:${port}/api`);
  } catch (error) {
    const logger = new Logger('Bootstrap');
    logger.error(`❌ Error starting server: ${error.message}`);
    process.exit(1);
  }
}
bootstrap().catch((err) => {
  console.error('❌ Fatal error during bootstrap:', err);
  process.exit(1);
});
