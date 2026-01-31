/* eslint-disable prettier/prettier */
import { Module, } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User, UserSchema } from './entities/user.entity';
import { Token, TokenSchema } from './entities/token.entity';
import { ProfilePicture, ProfilePictureSchema } from './entities/profile-picture.entity';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './repository/user.repository';
import TokenRepository from './repository/token.repository';
import ProfilePictureRepository from './repository/profile-picture.repository';
import AuthGuard from 'src/Guards/auth/auth.guard';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Token.name, schema: TokenSchema }, { name: ProfilePicture.name, schema: ProfilePictureSchema },]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, TokenRepository, ProfilePictureRepository, AuthGuard],
  exports: [UserRepository, TokenRepository,],

})
export default class UserModule { };