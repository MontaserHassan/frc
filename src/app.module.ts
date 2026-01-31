/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import UserModule from './Modules/user/user.module';
import UtilModule from './Modules/Utils/util.module';
import NewsModule from './Modules/news/news.module';
import ContactUsModule from './Modules/contact-us/contact-us.module';

import AppController from './app.controller';
import Constants from './Core/Constant/constant.constant';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRoot(Constants.DB_URI),
    ScheduleModule.forRoot(),
    JwtModule.register({ secret: Constants.JWT_SECRET }),
    UtilModule,
    UserModule,
    NewsModule,
    ContactUsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export default class AppModule { };