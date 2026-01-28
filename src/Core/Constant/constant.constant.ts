/* eslint-disable prettier/prettier */
const Constants = {
    /* ############## server requirements ############## **/
    DOMAIN: process.env.DOMAIN,
    SERVER_URL: `${process.env.DOMAIN}:${process.env.PORT}/${process.env.API}/${process.env.API_VERSION}`,
    DB_URI: String(process.env.DB_URI),
    APP_NAME: process.env.APP_NAME,
    APP_HOST: process.env.APP_HOST,
    PORT: Number(process.env.PORT),
    VERSION: String(process.env.API_VERSION),
    PROD: process.env.PROD === '1' ? true : false,
    API: process.env.API,

    /* ############# token requirements ############## **/
    BEARER_SECRET: process.env.BEARER_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRATION_DATE_PER_MINUTES: process.env.EXPIRATION_DATE_PER_MINUTES,
    API_KEY: process.env.API_KEY,

    /* redis **/
    REDIS_HOST: process.env.PROD === '1' ? process.env.REDIS_HOST : process.env.APP_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_URL: `redis://${process.env.PROD === '1' ? process.env.REDIS_HOST : process.env.APP_HOST}:${process.env.REDIS_PORT}`
};



export default Constants;