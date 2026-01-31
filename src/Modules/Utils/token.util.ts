/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import TokenService from '../user/repository/token.repository';



@Injectable()
export default class TokenUtil {

    constructor(private readonly jwtService: JwtService, private readonly tokenService: TokenService) { };

    async createToken(email: string, userName: string, userId: string): Promise<string> {
        const tokenId = Math.floor(1000000000 + Math.random() * 9000000000);
        const expiryDate = this.calculateExpiryDate(Number(process.env.EXPIRATION_DATE_PER_MINUTES));
        const payload = { email: email, userName: userName, userId: userId, tokenId: tokenId, expiryDate: expiryDate.date };
        const token = await this.jwtService.signAsync(payload, { expiresIn: expiryDate.expiryDurationPerSecond });
        await this.tokenService.create({ tokenId: tokenId, userId: userId, expiryDate: expiryDate.date });
        return token;
    };

    async verifyToken(token: string): Promise<any> {
        const isTokenVerified = await this.jwtService.verifyAsync(token);
        return isTokenVerified;
    };

    extractToken(authHeader: string): string | null {
        if (authHeader.startsWith(`${process.env.BEARER_SECRET} `)) {
            const token = authHeader.slice(7, authHeader.length).trim();
            if (!this.validateToken(token)) return null;
            return token;
        };
        return null;
    };

    private validateToken(token: string): boolean {
        return Boolean(token && token.length > 0);
    };

    private calculateExpiryDate(timePerMinutes: number): { date: Date, expiryDurationPerSecond: number } {
        const date = new Date();
        date.setMinutes(date.getMinutes() + timePerMinutes);
        const expiryDurationPerSecond = timePerMinutes * 60;
        return { date: date, expiryDurationPerSecond: expiryDurationPerSecond };
    };

    async hasTokenActiveByUserId(id: string) {
        const token = await this.tokenService.findOne({ userId: id, active: true, expiryDate: { $gt: new Date() } });
        return token;
    };

    async hasTokenActiveByTokenId(id: number) {
        const token = await this.tokenService.findOne({ tokenId: id, active: true, expiryDate: { $gt: new Date() } });
        return token;
    };

    async deleteToken(tokenId: number) {
        const token = await this.tokenService.remove(tokenId);
        return token;
    };

    async deleteTokensByUserId(userId: string): Promise<boolean> {
        const tokens = await this.tokenService.removeMany(userId);
        return tokens ? true : false;
    };

};