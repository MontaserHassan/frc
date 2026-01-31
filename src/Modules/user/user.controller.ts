/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards, Request, Response, HttpStatus, } from '@nestjs/common';

import UserService from './user.service';
import JwtAuthGuard from 'src/Guards/auth/auth.guard';
import GoogleAuthGuard from 'src/Guards/social/google.guard';
import FacebookAuthGuard from 'src/Guards/social/facebook.guard';
import LinkedinAuthGuard from 'src/Guards/social/linkedin.guard';
import SuccessResponse from 'src/Core/helpers/success-response.helper';
import { SuccessUserMessage } from './Messages/index.message';
import CreateUserDto from './dto/create-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';



@Controller('user')
export default class UserController {

  constructor(private readonly userService: UserService,) { };

  @Post('/register')
  async register(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.register(createUserDto);
      return newUser;
    } catch (error) {
      throw error;
    };
  };

  @Get('/social/google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() { };

  @Get('/social/facebook')
  @UseGuards(FacebookAuthGuard)
  facebookAuth() { };

  @Get('/social/linkedin')
  @UseGuards(LinkedinAuthGuard)
  linkedinAuth() { };

  @Post('/login')
  async login(@Request() req, @Response() res, @Body() signInUserDto: SignInUserDto,) {
    try {
      const user = await this.userService.login(signInUserDto);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessUserMessage.LOGIN,
        data: user,
      });
    } catch (error) {
      throw error;
    };
  };

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfiler(@Request() req, @Response() res,) {
    try {
      const user = await this.userService.getProfiler(req.user.userId);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessUserMessage.PROFILE,
        data: {
          user: user,
        },
      });
    } catch (err) {
      throw err;
    };
  };

};