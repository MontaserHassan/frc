/* eslint-disable prettier/prettier */
import { Module, } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Customer, CustomerSchema } from './entities/customer.entity';
import { Token, TokenSchema } from './entities/token.entity';
import CustomerController from './customer.controller';
import CustomerService from './customer.service';
import TokenService from './token.service';
import AuthGuard from 'src/Guards/auth/auth.guard';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }, { name: Token.name, schema: TokenSchema },]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, TokenService, AuthGuard],
  exports: [CustomerService, TokenService,],

})
export default class CustomerModule { };