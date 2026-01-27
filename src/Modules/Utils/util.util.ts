/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';



@Injectable()
export default class Util {

    constructor() { };

    pagination(totalDocuments: number, page: number, limit: number) {
        const pageSize = Number(limit) || 10;
        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * pageSize;
        const totalPages = Math.ceil(totalDocuments / pageSize);
        return { limit: pageSize, skip: skip, totalDocuments: totalDocuments, totalPages: totalPages, currentPage: currentPage };
    };

};