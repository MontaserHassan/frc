/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import CustomerModule from 'src/Modules/customer/customer.module';
import Util from './util.util';
import TokenUtil from './token.util';



@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, }),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        CustomerModule,
    ],
    providers: [Util, TokenUtil],
    exports: [Util, TokenUtil],
})
export default class UtilModule { };