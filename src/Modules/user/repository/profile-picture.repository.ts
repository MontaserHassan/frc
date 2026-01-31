/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProfilePicture, ProfilePictureDocument } from '../entities/profile-picture.entity';



@Injectable()
export default class UserService {

    constructor(@InjectModel(ProfilePicture.name) private profilePictureModel: Model<ProfilePictureDocument>) { };

    async create(userId: string, avatar: string) {
        const profile = await this.profilePictureModel.create({ userId, avatar: avatar });
        return profile;
    };

    async findOne(filterProfilePictureDataDto: string) {
        // const profile = await this.profilePictureModel.findOne(filterProfilePictureDataDto);
        // return profile;
    };

    async update(userId: string, avatar: string) {
        const profile = await this.profilePictureModel.findOneAndUpdate({ userId }, { avatar: avatar }, { new: true });
        return profile;
    };

};