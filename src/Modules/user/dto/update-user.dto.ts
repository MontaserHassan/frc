/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, Matches, MinLength, MaxLength, IsOptional, IsNumberString, IsMongoId, } from 'class-validator';
import { Transform, } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';



export default class UpdateUserDto {
    @ApiProperty({ example: 'Montaser' })
    @IsString({ message: 'First name must be a string' })
    @IsOptional({})
    @Matches(/^[a-zA-Z]{1,15}$/, { message: 'First name must contain only english letters', })
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly firstName?: string;

    @ApiProperty({ example: 'Hassan' })
    @IsString({ message: 'Last name must be a string' })
    @IsOptional({})
    @Matches(/^[a-zA-Z]{1,15}$/, { message: 'Last name must contain only english letters', })
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly lastName?: string;

    @IsString({})
    @IsOptional({})
    userName?: string;

    @ApiProperty({ example: 'oH2Y2@example.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @MaxLength(50, { message: 'Email cannot be longer than 50 characters', })
    @Transform(({ value }) => value.trim().toLowerCase())
    email?: string;

    @ApiProperty({ example: '+20' })
    @IsString({ message: 'Country code must be a string' })
    @IsOptional({})
    @Matches(/^\+[\d]{1,3}$/, { message: 'Country code must start with "+" and contain 1 to 3 digits' })
    countryCode?: string;

    @ApiProperty({ example: '1234567890' })
    @IsNumberString({})
    @IsOptional({})
    @Matches(/^\d{10,15}$/, { message: 'Phone number must contain 10 to 15 digits' })
    phoneNumber?: string;

    @ApiProperty({ example: 'google' })
    @IsString({ message: 'Provider must be a string' })
    @IsOptional()
    provider?: string;

    @ApiProperty({ example: '1234567890' })
    @IsString({ message: 'Provider Id must be a string' })
    @IsOptional()
    providerId?: string;
};