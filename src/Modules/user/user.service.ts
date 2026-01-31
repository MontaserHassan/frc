/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import UserRepository from './repository/user.repository';
import TokenUtil from 'src/Modules/Utils/token.util';
import CustomExceptionFilter from 'src/Core/Error/error-exception.error';
import { ErrorUserMessage } from './Messages/index.message';
import CreateUserDto from './dto/create-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';


@Injectable()
export default class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenUtil: TokenUtil,
  ) { };

  async register(createUserDto: CreateUserDto) {
    try {
      const { email, phoneNumber } = createUserDto;
      const isUserExisting = await this.userRepository.findOneByOr({ email, phoneNumber });
      if (isUserExisting) throw new CustomExceptionFilter(``, HttpStatus.BAD_REQUEST, ['email', 'phoneNumber']);
      createUserDto.userName = `${createUserDto.firstName} ${createUserDto.lastName}`;
      const newUser = await this.userRepository.create(createUserDto);
      return newUser;
    } catch (error) {
      throw error;
    };
  };

  async login(signInUserDto: SignInUserDto,) {
    try {
      const { email, password } = signInUserDto;
      const user = await this.userRepository.findOne({ email });
      if (!user) throw new CustomExceptionFilter(ErrorUserMessage.EMAIL_OR_PASSWORD_INCORRECT, HttpStatus.UNAUTHORIZED, ['email', 'password']);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new CustomExceptionFilter(ErrorUserMessage.EMAIL_OR_PASSWORD_INCORRECT, HttpStatus.UNAUTHORIZED, ['email', 'password']);
      const newToken = await this.tokenUtil.createToken(user.email, user.userName, user._id.toString(),);
      return { newToken, user };
    } catch (error) {
      throw error;
    };
  };

  async getProfiler(userId: string) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) throw new CustomExceptionFilter(ErrorUserMessage.NOT_FOUND, HttpStatus.NOT_FOUND, ['user']);
      return user
    } catch (err) {
      throw err;
    };
  };

};