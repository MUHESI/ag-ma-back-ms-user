import { Type } from 'class-transformer'
import GetItemsDateParamsDto from './get-items-DateParams.dto'
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class GetPaginatedItemsByMemberByDateQueryDto extends GetItemsDateParamsDto {
    @ApiProperty({
        description: 'memberId for this item',
        example: 2,
    })
    @IsNumber()
    @Type(() => Number)
    member: number;
}
