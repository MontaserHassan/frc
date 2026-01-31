/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, Matches, MinLength, MaxLength, IsOptional, IsNumberString, } from 'class-validator';
import { Transform, } from 'class-transformer';



export default class CreateUserDto {
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    @MinLength(1, { message: 'First name must be at least 1 characters long', })
    @MaxLength(15, { message: 'First name cannot be longer than 15 characters', })
    @Matches(/^[a-zA-Z]{1,15}$/, { message: 'First name must contain only english letters', })
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly firstName: string;

    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    @MinLength(1, { message: 'Last name must be at least 1 characters long', })
    @MaxLength(15, { message: 'Last name cannot be longer than 15 characters', })
    @Matches(/^[a-zA-Z]{1,15}$/, { message: 'Last name must contain only english letters', })
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly lastName: string;

    @IsString({})
    @IsOptional({})
    userName: string;

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @MaxLength(50, { message: 'Email cannot be longer than 50 characters', })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @IsString({ message: 'Country code must be a string' })
    @IsNotEmpty({ message: 'Country code is required' })
    @Matches(/^\+[\d]{1,3}$/, { message: 'Country code must start with "+" and contain 1 to 3 digits' })
    countryCode: string;

    @IsNumberString({})
    @IsNotEmpty({ message: 'Phone number is required' })
    @Matches(/^\+[\d]{10,15}$/, { message: 'Phone number must start with "+" and contain 10 to 15 digits' })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(15, { message: 'Password cannot be longer than 15 characters' })
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*_])[A-Za-z\d!@#$%&*_]{8,15}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%&*_)', })
    readonly password: string;
};