/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards, Request, Response, HttpStatus, } from '@nestjs/common';

import UserService from './user.service';
import JwtAuthGuard from 'src/Guards/auth/auth.guard';
import GoogleAuthGuard from 'src/Guards/social/google.guard';
import FacebookAuthGuard from 'src/Guards/social/facebook.guard';
import LinkedinAuthGuard from 'src/Guards/social/linkedin.guard';
import SuccessResponse from 'src/Core/helpers/success-response.helper';
import { ErrorUserMessage, SuccessUserMessage } from './Messages/index.message';
import CreateUserDto from './dto/create-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';
import SocialUserDto from './dto/social-user.dto';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiResponseProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';
import Constants from 'src/Core/Constant/constant.constant';



@Controller('user')
export default class UserController {

  constructor(private readonly userService: UserService,) { };

  ///////////////////////////// form /////////////////////////////

  @Post('/register')
  @ApiOperation({ summary: 'User register' })
  @ApiOkResponse({ description: SuccessUserMessage.CREATED })
  @ApiBadRequestResponse({ description: ErrorUserMessage.USER_ALREADY_LOGGED_IN })
  @ApiBody({ type: CreateUserDto })
  @ApiResponseProperty({ type: { responseCode: HttpStatus.OK, responseMessage: SuccessUserMessage.CREATED, data: { user: Object } } })
  async register(@Request() req, @Response() res, createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.register(createUserDto);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessUserMessage.CREATED,
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      throw error;
    };
  };

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: SuccessUserMessage.LOGIN })
  @ApiUnauthorizedResponse({ description: ErrorUserMessage.EMAIL_OR_PASSWORD_INCORRECT })
  @ApiBody({ type: SignInUserDto })
  @ApiResponseProperty({ type: { responseCode: HttpStatus.OK, responseMessage: SuccessUserMessage.LOGIN, data: { newToken: String, user: Object } } })
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

  ///////////////////////////// google /////////////////////////////

  @Get('/social/google')
  @ApiOperation({ summary: 'Redirect to Google login' })
  @UseGuards(GoogleAuthGuard)
  googleAuth() { };

  @Get('/social/google/callback')
  @ApiOperation({ summary: 'Google OAuth callback' })
  @UseGuards(GoogleAuthGuard)
  async addAndLoginGoogle(@Request() req, @Response() res, @Body() socialUserDto: SocialUserDto,) {
    try {
      socialUserDto.provider = 'google';
      const user = await this.userService.addAndLoginSocialUser(socialUserDto);
      SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: '',
        data: user,
      });
      console.log('user: ', user);
      return res.redirect(`${Constants.SUCCEEDED_URL}/`)
    } catch (error) {
      throw error;
    };
  };

  ///////////////////////////// facebook /////////////////////////////

  @Get('/social/facebook')
  @ApiOperation({ summary: 'Redirect to Facebook login' })
  @UseGuards(FacebookAuthGuard)
  facebookAuth() { };

  @Get('/social/facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async addAndLoginFacebook(@Request() req, @Response() res, @Body() socialUserDto: SocialUserDto,) {
    try {
      socialUserDto.provider = 'facebook';
      const user = await this.userService.addAndLoginSocialUser(socialUserDto);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: '',
        data: user,
      });
    } catch (error) {
      throw error;
    };
  };

  ///////////////////////////// linkedin /////////////////////////////

  @Get('/social/linkedin')
  @ApiOperation({ summary: 'Redirect to Linkedin login' })
  @UseGuards(LinkedinAuthGuard)
  linkedinAuth() { };

  @Get('/social/linkedin/callback')
  @UseGuards(LinkedinAuthGuard)
  async addAndLoginLinkedin(@Request() req, @Response() res, @Body() socialUserDto: SocialUserDto,) {
    try {
      socialUserDto.provider = 'linkedin';
      const user = await this.userService.addAndLoginSocialUser(socialUserDto);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: '',
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