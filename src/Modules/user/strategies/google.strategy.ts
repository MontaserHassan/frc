import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

import Constants from "src/Core/Constant/constant.constant";



@Injectable()
export default class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: Constants.GOOGLE_CLIENT_ID,
            clientSecret: Constants.GOOGLE_CLIENT_SECRET,
            callbackURL: Constants.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    };

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const { emails, name, photos, id } = profile;
        const user = {
            id: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    };

};