/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../entities/user.entity';
import CreateUserDto from '../dto/create-user.dto';
import FilterUserDataDto from '../dto/filter-data-user.dto';



@Injectable()
export default class UserRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { };

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  };

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-__v').sort({ createdAt: -1 });
    return users;
  };

  async findWithPagination(filterData: FilterUserDataDto, limit: number, skip: number): Promise<User[]> {
    const usersWithPagination = await this.userModel.find(filterData).skip(skip).limit(limit).select('-__v').sort({ createdAt: -1 });
    return usersWithPagination;
  };

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-__v');
    return user;
  };

  async findOne(filterData: FilterUserDataDto) {
    const user = await this.userModel.findOne(filterData).select('-__v');
    return user;
  };

  async findOneByOr(filterData: FilterUserDataDto) {
    const user = await this.userModel.findOne({ $or: [filterData] }).select('-__v');
    return user;
  };

};