/* eslint-disable prettier/prettier */
import Redis from 'ioredis';

import Constants from 'src/Core/Constant/constant.constant';


const redisClient = new Redis({
    host: Constants.REDIS_HOST,
    port: Constants.REDIS_PORT,
    retryStrategy() {
        return Math.min(2 * 100, 2000);
    },
});



export default redisClient;