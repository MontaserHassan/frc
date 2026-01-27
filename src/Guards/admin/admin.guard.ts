/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';

import CustomExceptionFilter from 'src/Core/Error/error-exception.error';



@Injectable()
export default class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(request: Request): boolean {
        try {
            const headerToken = request.headers['x-api-key'];
            if (!headerToken || headerToken !== process.env.API_KEY) throw new CustomExceptionFilter('You are not allowed to access this resource', HttpStatus.UNAUTHORIZED, ['Missing or invalid API key'],);
            return true;
        } catch (error) {
            throw new CustomExceptionFilter(error.message || 'Unauthorized', error.status || HttpStatus.UNAUTHORIZED, error.fields || [],);
        };
    };

};