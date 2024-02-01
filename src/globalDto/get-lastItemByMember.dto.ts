import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator';

export default class GetLastItemByMemberDto {
    @ApiProperty({
        description: 'memberId for this item',
        example: 1,
    })
    @IsNumber()
    @Type(() => Number)
    member: number;
}
