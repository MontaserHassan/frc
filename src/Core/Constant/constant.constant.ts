/* eslint-disable prettier/prettier */
const Constants = {
    /* ############# server requirements ############# **/
    DOMAIN: process.env.DOMAIN,
    SERVER_URL: `${process.env.DOMAIN}:${process.env.PORT}/${process.env.API}/${process.env.API_VERSION}`,
    DB_URI: String(process.env.DB_URI),
    APP_NAME: process.env.APP_NAME,
    APP_HOST: process.env.APP_HOST,
    PORT: Number(process.env.PORT),
    VERSION: String(process.env.API_VERSION),
    PROD: process.env.PROD === '1' ? true : false,
    API: process.env.API,

    /* ############# token requirements ############# **/
    BEARER_SECRET: process.env.BEARER_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRATION_DATE_PER_MINUTES: process.env.EXPIRATION_DATE_PER_MINUTES,
    API_KEY: process.env.API_KEY,

    /* ############# redis requirements ############# **/
    REDIS_HOST: process.env.PROD === '1' ? process.env.REDIS_HOST : process.env.APP_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_URL: `redis://${process.env.PROD === '1' ? process.env.REDIS_HOST : process.env.APP_HOST}:${process.env.REDIS_PORT}`,

    /* Stripe requirements **/
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    /* Mailer requirements **/
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    /* ############# google requirements ############# **/
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    SUCCEEDED_URL: process.env.SUCCEEDED_URL,

    /* ############# linkedin requirements ############# **/
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    LINKEDIN_CALLBACK_URL: process.env.LINKEDIN_CALLBACK_URL,

    /* ############# facebook requirements ############# **/
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,

    /* ############# twitter requirements ############# **/
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    TWITTER_CALLBACK_URL: process.env.TWITTER_CALLBACK_URL,
};



export default Constants;