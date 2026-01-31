/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



type TokenDocument = Token & Document;


@Schema({ timestamps: true })
class Token {
  @Prop({ type: Number, required: true, unique: true })
  tokenId: number;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ type: Date, required: true, index: { expireAfterSeconds: 0 } })
  expiryDate: Date;
};


const TokenSchema = SchemaFactory.createForClass(Token);



export {
  TokenSchema,
  Token,
  TokenDocument
};
