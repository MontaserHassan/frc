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
import GoogleStrategy from './strategies/google.strategy';
import FacebookStrategy from './strategies/facebook.strategy';
import LinkedinStrategy from './strategies/linkedin.strategy';
import { SessionSerializer } from 'src/Guards/passport.serializer';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Token.name, schema: TokenSchema }, { name: ProfilePicture.name, schema: ProfilePictureSchema },]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false, }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, TokenRepository, ProfilePictureRepository, SessionSerializer, GoogleStrategy, FacebookStrategy, LinkedinStrategy, AuthGuard],
  exports: [UserRepository, TokenRepository,],

})
export default class UserModule { };