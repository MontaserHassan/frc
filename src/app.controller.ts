/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Response } from '@nestjs/common';

import { ResponseInterface } from './Core/Interfaces/response.interface';



@Controller()
export default class AppController {

  constructor() { };

  @Get('/health')
  getHello(@Request() req, @Response() res): Record<string, any> {
    const responseData = 'Hello from: Restaurant Management System!';
    const response: ResponseInterface = {
      responseCode: 200,
      responseMessage: responseData,
      data: {},
    };

    return res.status(response.responseCode).send(response);
  };

};