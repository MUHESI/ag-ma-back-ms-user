import { IsString } from 'class-validator';
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export default class GetItemsDateParamsDto {
    @ApiProperty({
        description: 'startDat for this item',
        example: "2023-08-20T16:34:35.752Z",
    })
    @IsString()
    startDate: string;

    @ApiProperty({
        description: 'endDate for this item',
        example: "2023-08-20T16:34:35.752Z",
    })
    @IsString()
    endDate: string;
}
