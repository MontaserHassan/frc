/* eslint-disable prettier/prettier */
import { Request, Response } from '@nestjs/common';

import { ResponseInterface } from 'src/Core/Interfaces/response.interface';
import { formatDate } from 'src/Core/helpers/helper-functions.helper';



export default class SuccessResponse {

    constructor() { };

    static send(@Request() req, @Response() res, responseValue: ResponseInterface) {
        const lang = req.query?.lang?.toString() || 'en';
        const successResponse = {
            path: req.url,
            method: req.method,
            status: 'success',
            appName: process.env.APP_NAME,
            timestamp: formatDate(new Date()),
            responseCode: responseValue.responseCode || 200,
            responseMessage: responseValue.responseMessage,
            data: responseValue.data,
        };
        res.locals = successResponse;
        return res.status(responseValue.responseCode).send(successResponse);
    };

};