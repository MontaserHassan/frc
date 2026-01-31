import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';



@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
    constructor() {
        super({
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: process.env.LINKEDIN_CALLBACK_URL,
            scope: ['r_liteprofile', 'r_emailaddress'],
        });
    };

    validate(_, __, profile) {
        return {
            provider: 'linkedin',
            providerId: profile.id,
            email: profile.emails?.[0]?.value,
            fullName: profile.displayName,
            avatar: profile.photos?.[0]?.value,
        };
    };

};