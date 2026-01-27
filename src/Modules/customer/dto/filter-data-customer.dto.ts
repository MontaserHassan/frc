/* eslint-disable prettier/prettier */
export default class FilterCustomerDataDto {
    readonly email?: string;
    readonly phoneNumber?: {
        countryCode: string;
        phoneNumber: string;
    };
};