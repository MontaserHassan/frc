/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
dotenv.config();

import AppModule from './app.module';
import Constants from './Core/Constant/constant.constant';
import ValidationExceptionFilter from './Core/Exceptions/error.exception';
import LoggerMiddleware from './Core/logger/logger.middleware';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${Constants.API}/${Constants.VERSION}`);
  app.use(bodyParser.json({ limit: '20mb' }));
  app.enableCors({ origin: '*', credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ValidationExceptionFilter());

  if (Constants.PROD) app.use(new LoggerMiddleware().use);

  const documentConfig = new DocumentBuilder()
    .setTitle('FRC Web API')
    .setDescription('API documentation for FRC Web')
    .setVersion(Constants.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api-docs', app, document);

  const server = await app.listen(Constants.PORT);
  const address = server.address();

  Logger.verbose(
    `
      -----------------------------------------------------------------------------------------------
      ███████╗██████╗  ██████╗    ██╗    ██╗███████╗██████╗
      ██╔════╝██╔══██╗██╔════╝    ██║    ██║██╔════╝██╔══██╗
      █████╗  ██████╔╝██║         ██║ █╗ ██║█████╗  ██████╔╝
      ██╔══╝  ██╔══██╗██║         ██║███╗██║██╔══╝  ██╔══██╗
      ██║     ██║  ██║╚██████╗    ╚███╔███╔╝███████╗██████╔╝
      ╚═╝     ╚═╝  ╚═╝ ╚═════╝     ╚══╝╚══╝ ╚══════╝╚═════╝
      -----------------------------------------------------------------------------------------------
    `,
    'FRC-WEB',
  );
  Logger.log(`🚀 🔑 Application Name is: ${Constants.APP_NAME}`, 'AppName');
  Logger.log(`🔧 Environment: ${Constants.PROD ? 'Production' : 'Development'}`, 'Environment');
  Logger.log(`⚙️ 🧩 Server is listening on port: ${address.port}`, 'Port');
  Logger.log(`🛠️ 🏷️  Application Version: ${Constants.VERSION}`, 'AppVersion');
  Logger.log(`🌐 Application is running on: ${Constants.SERVER_URL}`, 'Server');
  Logger.log(`⏱️ Start Time: ${new Date().toLocaleString()}`, 'StartTime');
  Logger.log(`📅 First Running Time: ${new Date().toLocaleString()}`, 'FirstRunningTime');
  Logger.log(`🗄️  Connected to database: ${Constants.DB_URI}`, 'Database');
  Logger.log(`🧠 🔴 Redis Connection: ${Constants.REDIS_URL}`, 'Redis');
  Logger.log(`📚  Swagger documentation available at: ${Constants.DOMAIN}:${Constants.PORT}/api-docs`, 'Swagger');

};



bootstrap();