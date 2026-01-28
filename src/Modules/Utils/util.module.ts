/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import CustomerModule from 'src/Modules/customer/customer.module';
import Util from './util.util';
import TokenUtil from './token.util';
import RedisUtil from './redis.util';
import CryptoUtil from './crypto.util';
import MailUtil from './mail.util';
import PaymentUtil from './payment.util';



@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, }),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        CustomerModule,
    ],
    providers: [Util, TokenUtil, RedisUtil, CryptoUtil, MailUtil, PaymentUtil,],
    exports: [Util, TokenUtil, RedisUtil, CryptoUtil, MailUtil, PaymentUtil,],
})
export default class UtilModule { };