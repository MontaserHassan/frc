/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';



type UserDocument = User & Document;


@Schema({ timestamps: true })
class User {
    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: String, required: true })
    userName: string;

    @Prop({ type: String, required: true, })
    countryCode: string;

    @Prop({ type: String, required: true, })
    phoneNumber: string;

    @Prop({ type: String, required: true, unique: true, })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: false, enum: ['form', 'google', 'facebook', 'linkedin'], default: 'form', })
    provider: 'form' | 'google' | 'facebook' | 'linkedin';

    @Prop({ type: String, required: false })
    providerId: string;
};


const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ countryCode: 1, phoneNumber: 1 }, { unique: true });


UserSchema.pre<UserDocument>('save', async function () {
    if (!this.isModified('password')) return;
    if (!this.password) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.pre<UserDocument>('findOneAndUpdate', function (next: any) {
    this.set({ updatedAt: new Date() });
    next();
});

UserSchema.pre<UserDocument>('updateOne', function (next: any) {
    this.set({ updatedAt: new Date() });
    next();
});


UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        const { password, ...rest } = ret;
        return rest;
    },
});


UserSchema.set('toObject', {
    transform: function (doc, ret) {
        const { password, ...rest } = ret;
        return rest;
    }
});



export {
    UserSchema,
    User,
    UserDocument
};