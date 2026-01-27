/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer, CustomerDocument } from './entities/customer.entity';
import CreateCustomerDto from './dto/create-customer.dto';
import FilterCustomerDataDto from './dto/filter-data-customer.dto';



@Injectable()
export default class CustomerService {

  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { };

  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = await this.customerModel.create(createCustomerDto);
    return newCustomer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerModel.find().select('-__v -createdAt -updatedAt');
    return customers;
  };

  async findById(id: string) {
    const customer = await this.customerModel.findById(id).select('-__v -createdAt -updatedAt');
    return customer;
  };

  async findOne(filterData: FilterCustomerDataDto) {
    const customer = await this.customerModel.findOne(filterData).select('-__v -createdAt -updatedAt');
    return customer;
  };

  async findOneByOr(filterData: FilterCustomerDataDto) {
    const customer = await this.customerModel.findOne({ $or: [filterData] }).select('-__v -createdAt -updatedAt');
    return customer;
  };

};