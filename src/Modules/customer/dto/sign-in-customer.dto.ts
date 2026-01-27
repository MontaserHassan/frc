/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';



export default class SignInCustomerDto {
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    readonly password: string;
};