import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

import Constants from 'src/Core/Constant/constant.constant';



@Injectable()
export default class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: Constants.FACEBOOK_CLIENT_ID,
            clientSecret: Constants.FACEBOOK_CLIENT_SECRET,
            callbackURL: Constants.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'emails', 'name', 'photos'],
            scope: ['email', 'public_profile'],
            enableProof: false,
        });
    };

    validate(_, __, profile) {
        console.log('profile: ', profile);
        return {
            provider: 'facebook',
            providerId: profile.id,
            email: profile.emails?.[0]?.value,
            fullName: `${profile.name.givenName} ${profile.name.familyName}`,
            avatar: profile.photos?.[0]?.value,
        };
    };

};