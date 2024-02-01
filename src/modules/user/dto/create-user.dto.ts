import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'first names of user',
    example: 'MUHESI',
  })
  @IsString()
  @IsNotEmpty()
  fName: string;

  @ApiProperty({
    description: 'second names of user',
    example: 'Moses',
  })
  @IsString()
  @IsNotEmpty()
  sName: string;

  @ApiProperty({
    description: 'last names of user',
    example: 'Thierry',
  })
  @IsString()
  @IsNotEmpty()
  lName: string;

  @ApiProperty({
    description: "profession of user",
    example: 'Software engineer',
  })
  @IsString()
  @IsNotEmpty()
  professionUser: string; // TODO: Improve this later 

  @ApiProperty({
    description: "Member's email address",
    example: 'muhesi.dev@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Address member',
    example: 'GOMA/DRC',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: "Member's phone number",
    example: '+243998 799306',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: "User's link picture",
    example: 'https://www.youtube.com/watch?v=M2P7phK2sa4',
  })
  @IsNotEmpty()
  cover: string;

  @ApiProperty({
    description: "User id",
    example: 12,
  })
  // @IsNotEmpty()
  // createdBy: number;

  @ApiProperty({
    description: "Password of user",
    example: 'my@password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Member's role in company",
    example: "'ADMIN'|'COORDINATOR'|'SECRETARY'",
  })
  // @IsIn([RoleUser.ADMIN, RoleUser.COORDINATOR, RoleUser.SECRETARY])
  @IsIn(['ADMIN', 'COORDINATOR', 'SECRETARY'])
  role: string;

  @ApiProperty({
    description: 'Status of item',
    example: "'BLOCKED'|'DELETED'|'ACTIVE'",
  })
  // @IsIn([CommonStatus.ACTIVE, CommonStatus.BLOCKED, CommonStatus.DELETED])
  @IsIn(['ACTIVE', 'BLOCKED', 'DELETED'])
  status: string;
  // ADD OTHER KEYS HERE
}
