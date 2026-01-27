/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Token, TokenDocument } from './entities/token.entity';
import CreateTokenDto from './dto/create-token.dto';
import FilterTokenDataDto from './dto/filter-data-token.dto';
import UpdateTokenDto from './dto/update-token.dto';



@Injectable()
export default class TokenService {

    constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) { };

    async create(createTokenDto: CreateTokenDto) {
        const createdToken = await this.tokenModel.create(createTokenDto);
        return createdToken;
    };

    async findById(id: string): Promise<Token> {
        const token = await this.tokenModel.findById(id).select('-__v -createdAt -updatedAt');
        return token;
    };

    async findOne(filterData: FilterTokenDataDto): Promise<Token> {
        const token = await this.tokenModel.findOne(filterData as Partial<Token>).select('-__v -createdAt -updatedAt');
        return token;
    };

    async update(tokenId: number, updateTokenDto: UpdateTokenDto) {
        const updatedToken = await this.tokenModel.findOneAndUpdate({ tokenId }, updateTokenDto, { new: true }).select('-__v -createdAt -updatedAt')
        return updatedToken;
    };

    async remove(tokenId: number) {
        const deletedToken = await this.tokenModel.findOneAndDelete({ tokenId }).select('-__v -createdAt -updatedAt');
        return deletedToken;
    };

    async removeMany(userId: string) {
        const deletedTokens = await this.tokenModel.deleteMany({ userId }).select('-__v -createdAt -updatedAt');
        return deletedTokens;
    };

};