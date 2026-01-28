/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import ContactUsService from './contact-us.service';
import ContactUsController from './contact-us.controller';
import { ContactUS, ContactUSSchema } from './entities/contact-us.database';
import EmailConsumer from './consumer/contact-us.consumer';



@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, }),
        MongooseModule.forFeature([{ name: ContactUS.name, schema: ContactUSSchema }]),
    ],
    controllers: [ContactUsController, EmailConsumer,],
    providers: [ContactUsService,],
})
export default class ContactUsModule { };