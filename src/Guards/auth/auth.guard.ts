/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import TokenUtil from 'src/Modules/Utils/token.util';
import AuthCustomer from 'src/Core/Interfaces/customer.interface';
import CustomExceptionFilter from 'src/Core/Error/error-exception.error';



@Injectable()
export default class AuthGuard implements CanActivate {

  constructor(private readonly tokenUtil: TokenUtil) { };

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    return this.validateRequest(request, response);
  };

  async validateRequest(request: Request, response: Response) {
    try {
      const headerToken = request.headers['authorization'];
      if (!headerToken) throw new CustomExceptionFilter('You are not allow to access this resource', HttpStatus.UNAUTHORIZED, ['']);

      const token = this.tokenUtil.extractToken(headerToken);
      if (!token) throw new CustomExceptionFilter("You are not allow to access this resource", HttpStatus.UNAUTHORIZED, ['']);

      const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as AuthCustomer;
      if (!decoded) throw new CustomExceptionFilter("You are not allow to access this resource", HttpStatus.UNAUTHORIZED, ['']);

      const hasTokenActive = await this.tokenUtil.hasTokenActiveByTokenId(decoded.tokenId);
      if (!hasTokenActive || !hasTokenActive.active) throw new CustomExceptionFilter("This Session is Expired, Please login again", HttpStatus.UNAUTHORIZED, ['']);
      if (hasTokenActive.expiryDate < new Date) {
        await this.tokenUtil.deleteToken(decoded.tokenId)
        throw new CustomExceptionFilter("This Session is Expired, Please login again", HttpStatus.UNAUTHORIZED, ['']);
      };

      request.user = {
        customerName: decoded.customerName,
        email: decoded.email,
        customerId: decoded.customerId,
        tokenId: decoded.tokenId,
        expiryDate: decoded.expiryDate,
      } as AuthCustomer;

      return true;
    } catch (error) {
      throw new CustomExceptionFilter(error.message, error.status, error.fields);
    };
  };

};