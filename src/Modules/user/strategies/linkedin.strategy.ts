import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-openidconnect';

import Constants from 'src/Core/Constant/constant.constant';



@Injectable()
export default class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
    constructor() {
        super({
            issuer: 'https://www.linkedin.com',
            authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
            tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
            userInfoURL: 'https://api.linkedin.com/v2/userinfo',
            clientID: Constants.LINKEDIN_CLIENT_ID,
            clientSecret: Constants.LINKEDIN_CLIENT_SECRET,
            callbackURL: Constants.LINKEDIN_CALLBACK_URL,
            scope: ['openid', 'profile', 'email'],
            passReqToCallback: true,
        });
    };

    validate(req, accessToken, refreshToken, profile, done) {
        console.log('refreshToken: ', refreshToken);
        console.log('profile: ', profile);
        console.log('accessToken: ', accessToken);
        return done(null, {
            provider: 'linkedin',
            providerId: profile.sub,
            email: profile.email ?? null,
            fullName: profile.name,
            firstName: profile.given_name,
            lastName: profile.family_name,
            avatar: profile.picture,
            emailVerified: profile.email_verified ?? false,
            locale: profile.locale,
            accessToken,
        });
    };

};