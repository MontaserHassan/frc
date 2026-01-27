/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';



export default class CreateTokenDto {

    @IsString()
    @IsNotEmpty({ message: 'Customer Id is required' })
    readonly customerId: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Token Id is required' })
    readonly tokenId: number;

    @IsDate()
    @IsNotEmpty({ message: 'Expiry Date is required' })
    readonly expiryDate: Date;
};