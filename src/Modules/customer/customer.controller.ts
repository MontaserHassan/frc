/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards, Request, Response, HttpStatus, } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import CustomerService from './customer.service';
import AuthGuard from 'src/Guards/auth/auth.guard';
import TokenUtil from 'src/Modules/Utils/token.util';
import CustomExceptionFilter from 'src/Core/Error/error-exception.error';
import SuccessResponse from 'src/Core/helpers/success-response.helper';
import { ErrorCustomerMessage, SuccessCustomerMessage } from './Messages/index.message';
import CreateCustomerDto from './dto/create-customer.dto';
import SignInCustomerDto from './dto/sign-in-customer.dto';



@Controller('customer')
export default class CustomerController {

  constructor(
    private readonly customerService: CustomerService,
    private readonly tokenUtil: TokenUtil,
  ) { };

  @Post('/register')
  async register(@Request() req, @Response() res, @Body() createCustomerDto: CreateCustomerDto) {
    try {
      const { email, phoneNumber } = createCustomerDto;
      const isUserExisting = await this.customerService.findOneByOr({ email, phoneNumber });
      if (isUserExisting) throw new CustomExceptionFilter(`Customer with email ${createCustomerDto.email} already exists`, HttpStatus.BAD_REQUEST, ['email']);
      createCustomerDto.customerName = `${createCustomerDto.firstName} ${createCustomerDto.lastName}`;
      const newUser = await this.customerService.create(createCustomerDto);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessCustomerMessage.CREATED,
        data: {
          newUser: newUser,
        },
      });
    } catch (error) {
      throw error;
    };
  };

  @Post('/login')
  async login(@Request() req, @Response() res, @Body() signInCustomerDto: SignInCustomerDto,) {
    try {
      const { email, password } = signInCustomerDto;
      const customer = await this.customerService.findOne({ email });
      if (!customer) throw new CustomExceptionFilter(ErrorCustomerMessage.EMAIL_OR_PASSWORD_INCORRECT, HttpStatus.UNAUTHORIZED, ['email', 'password']);
      const isPasswordMatch = await bcrypt.compare(password, customer.password);
      if (!isPasswordMatch) throw new CustomExceptionFilter(ErrorCustomerMessage.EMAIL_OR_PASSWORD_INCORRECT, HttpStatus.UNAUTHORIZED, ['email', 'password']);
      const newToken = await this.tokenUtil.createToken(customer.email, customer.customerName, customer._id.toString(),);

      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCustomerMessage.LOGIN,
        data: {
          user: customer,
          token: newToken,
        },
      });
    } catch (error) {
      throw error;
    };
  };

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfiler(@Request() req, @Response() res,) {
    try {
      const user = await this.customerService.findById(req.user.customerId);
      if (!user) throw new CustomExceptionFilter(ErrorCustomerMessage.NOT_FOUND, HttpStatus.NOT_FOUND, ['user']);

      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCustomerMessage.PROFILE,
        data: {
          user: user,
        },
      });
    } catch (err) {
      throw err;
    };
  };

};