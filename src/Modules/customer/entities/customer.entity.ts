/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';



type CustomerDocument = Customer & Document;


@Schema({ timestamps: true })
class Customer {
    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: String, required: true, })
    customerName: string;

    @Prop({ type: Object, required: true, unique: true, })
    phoneNumber: object;

    @Prop({ type: String, required: true, unique: true, })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

};


const CustomerSchema = SchemaFactory.createForClass(Customer);


CustomerSchema.pre<CustomerDocument>('save', async function () {
    if (!this.isModified('password')) return;
    if (!this.password) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


CustomerSchema.pre<CustomerDocument>('findOneAndUpdate', function (next: any) {
    this.set({ updatedAt: new Date() });
    next();
});

CustomerSchema.pre<CustomerDocument>('updateOne', function (next: any) {
    this.set({ updatedAt: new Date() });
    next();
});


CustomerSchema.set('toJSON', {
    transform: function (doc, ret) {
        const { password, ...rest } = ret;
        return rest;
    },
});


CustomerSchema.set('toObject', {
    transform: function (doc, ret) {
        const { password, ...rest } = ret;
        return rest;
    }
});



export {
    CustomerSchema,
    Customer,
    CustomerDocument
};