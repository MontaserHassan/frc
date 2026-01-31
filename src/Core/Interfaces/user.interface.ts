/* eslint-disable prettier/prettier */
export default interface AuthUser {
    email: string;
    userName: string;
    userId: string;
    tokenId: number;
    expiryDate: Date;
};