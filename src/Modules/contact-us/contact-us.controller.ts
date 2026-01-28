/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req, Res, HttpStatus, } from '@nestjs/common';
import { Request, Response } from 'express';

import Util from 'src/Modules/Utils/util.util';
import ContactUsService from './contact-us.service';
import CreateContactUsDto from './dto/create-contact-us.dto';
import SuccessResponse from 'src/Core/helpers/success-response.helper';
import { SuccessContactUsMessage } from './Messages/index.message';


@Controller('contact-us')
export default class ContactUsController {
  constructor(
    private readonly util: Util,
    private readonly contactUSService: ContactUsService,
  ) { };

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response, @Body() createContactUsDto: CreateContactUsDto) {
    try {
      const messageId = this.util.generateId();
      const emailMessage = {
        email: createContactUsDto.email,
        userName: createContactUsDto.userName,
        phoneNumber: createContactUsDto.phoneNumber,
        messageId: messageId,
        content: createContactUsDto.content,
      };
      await this.contactUSService.create(emailMessage);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: `${SuccessContactUsMessage.CREATED} ${messageId}`,
        data: {
          message: createContactUsDto,
        },
      });
    } catch (err) {
      throw err;
    };
  };

};