/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export default class SignInUserDto {
    @ApiProperty({ example: 'oH2Y2@example.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    readonly password: string;
};