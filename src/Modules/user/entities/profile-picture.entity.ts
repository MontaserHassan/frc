/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';



type ProfilePictureDocument = ProfilePicture & Document;


@Schema({ timestamps: true })
class ProfilePicture {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: false })
    avatar?: string;

};


const ProfilePictureSchema = SchemaFactory.createForClass(ProfilePicture);


ProfilePictureSchema.pre<ProfilePictureDocument>('findOneAndUpdate', function (next: any) {
    this.set({ updatedAt: new Date() });
    next();
});

ProfilePictureSchema.pre<ProfilePictureDocument>('updateOne', function (next: any) {
    this.set({ updatedAt: new Date() });
    next();
});



export {
    ProfilePictureSchema,
    ProfilePicture,
    ProfilePictureDocument
};