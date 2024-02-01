import { Type } from 'class-transformer'
import GetItemsDateParamsDto from './get-items-DateParams.dto'
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class GetPaginatedItemsByEntityByDateQueryDto extends GetItemsDateParamsDto {
    @ApiProperty({
        description: 'Entity for this item',
        example: 2,
    })
    @IsNumber()
    @Type(() => Number)
    entity: number;
}
