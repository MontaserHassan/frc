/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import CustomerModule from './Modules/customer/customer.module';

import AppController from './app.controller';
import Constants from './Core/Constant/constant.constant';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRoot(Constants.DB_URI),
    ScheduleModule.forRoot(),
    JwtModule.register({ secret: Constants.JWT_SECRET }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export default class AppModule { };