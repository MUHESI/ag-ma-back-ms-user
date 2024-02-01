import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export default class GetItemsPaginationQueryDto {
    @ApiProperty({
        description: 'page for pagination of request',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page: string;


    @ApiProperty({
        description: 'limit for pagination of request',
        example: 10,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}
