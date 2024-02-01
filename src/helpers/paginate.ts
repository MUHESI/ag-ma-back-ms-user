import { IPaginationMeta, IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from "typeorm";

interface IResponse {
    success: boolean;
    status: number;
    data?: any;
    error?: any;
    message?: string;
}

// TODO: IMPROVE THIS lATER
export const getPaginatedItems = async <T>(repo: Repository<T>, options: IPaginationOptions, props?: Partial<T | any>): Promise<Pagination<T, IPaginationMeta>> => {
    return await paginate<T>(repo, options, {
        where: props !== null ? props : {},

    });
}


