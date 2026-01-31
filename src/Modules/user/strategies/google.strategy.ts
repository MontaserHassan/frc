import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    };

    validate(_, __, profile) {
        return {
            provider: 'google',
            providerId: profile.id,
            email: profile.emails?.[0]?.value,
            fullName: profile.displayName,
            avatar: profile.photos?.[0]?.value,
        };
    };

};