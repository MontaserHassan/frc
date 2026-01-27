/* eslint-disable prettier/prettier */
import AuthCustomer from "../Interfaces/customer.interface";


declare global {
    namespace Express {
        interface Request {
            user?: AuthCustomer;
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