/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsIn, } from 'class-validator';
import { Transform } from 'class-transformer';



export default class SocialUserDto {

    @IsString({ message: 'Provider Id must be a string' })
    @IsOptional({})
    providerId?: string;

    @IsString()
    @IsOptional({})
    provider?: string;

    @IsEmail({}, { message: 'Invalid email address' })
    @IsOptional({ message: 'Email is required' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email?: string;

    @IsString({ message: 'First name must be a string' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    firstName?: string;

    @IsString({ message: 'Last name must be a string' })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    lastName?: string;

    @IsString({ message: 'Avatar must be a string' })
    @IsOptional()
    avatar?: string;

};