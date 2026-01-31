/* eslint-disable prettier/prettier */
import AuthUser from "../Interfaces/user.interface";


declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
            requestNumberTrace: string;
        };
        interface Response {
            duration: any;
            locals: {
                responseData: any
            };
        };
    };
};