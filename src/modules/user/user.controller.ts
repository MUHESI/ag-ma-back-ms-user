import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { USER_SERVER_MESSAGE } from './dto/serverMessage';
import { AbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { UserEntity } from './entities/user.entity';
import { Action } from '../auth/enums/action.enum';
// import { ForbiddenError } from '@casl/ability';
import { ServerResponse, } from 'src/helpers/server.response';
import { CheckAbilities } from 'src/casl/decorators/ability.decorators';
import { AbilityGuard } from 'src/casl/ability.guard';
import { EventPattern } from '@nestjs/microservices';
import { EmitPattern } from 'src/mc-config/config';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export const currentUser: CreateUserDto = {
  fName: "Moses",
  sName: "Serge",
  lName: "Vicky",
  email: "01..muhesi@gmail.com",
  professionUser: "Engineer software",
  address: "KIGALI at Norrsken",
  phone: "0998799306",
  cover: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1676726074/porfolio/profile-pic_4_tolvjx.png",
  password: "root12345",
  role: "ADMIN",
  status: "ACTIVE",
  // createdAt: "2023-12-25T16:46:22.717Z",
  // updatedAt: "2023-12-25T16:46:22.717Z",
  // deletedAt: null,
  // id: "12998689-28dc-4560-9717-ecd8102c09b9",
}

const currentToUpdate: any = {
  fName: "Moses",
  sName: "Serge",
  lName: "Vicky",
  email: "muhesi@gmail.com",
  professionUser: "Engineer software",
  address: "KIGALI at Norrsken",
  phone: "0998799306",
  cover: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1676726074/porfolio/profile-pic_4_tolvjx.png",
  password: "root12345",
  role: "ADMIN",

  status: "ACTIVE",
  createdAt: "2023-12-25T16:46:22.717Z",
  updatedAt: "2023-12-25T16:46:22.717Z",
  deletedAt: null,
  id: "12998689-28dc-4560-9717-ecd8102c09b9",
}

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService,
    private abilityFactory: AbilityFactory
  ) { }
  @ApiCreatedResponse({
    description: `${USER_SERVER_MESSAGE.CREATED_SUCCESS}`,
    status: HttpStatus.CREATED
  })

  @EventPattern(EmitPattern.CREATE_USER)
  async createUser(data: { data: CreateUserDto }) {
    try {
      return await this.userService.create(EmitPattern.CREATE_USER, data.data);
    } catch (error) {
      return new ServerResponse(
        { resource: EmitPattern.CREATE_USER, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.CREATED_ERROR} | ${error.message}`,
        { item: null },
        error
      ).throw();
    }
  }

  @EventPattern(EmitPattern.GET_ALL_USERS)
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers(EmitPattern.GET_ALL_USERS);
    } catch (error) {
      return new ServerResponse(
        { resource: EmitPattern.GET_ALL_USERS, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.GET_ALL_ITEMS_ERROR} | ${error.message}`,
        { items: [] },
        error
      ).throw();
    }
  }

  @EventPattern(EmitPattern.GET_PAGINATED_USERS)
  async getPaginatedUserUsers(data: { pageOptions: IPaginationOptions }) {
    try {
      return await this.userService.getPaginatedUsers(EmitPattern.GET_PAGINATED_USERS, data.pageOptions);
    } catch (error) {
      return new ServerResponse(
        { resource: EmitPattern.GET_PAGINATED_USERS, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.GET_ALL_ITEMS_ERROR} | ${error.message}`,
        { items: [] },
        error
      ).throw();
    }
  }
  @EventPattern(EmitPattern.GET_USER_BY_ID)
  async getUserById(data: { idUser: string }) {
    return await this.userService.getUserById(data.idUser, { ressource: EmitPattern.UPDATE_USER });
  }
  @EventPattern(EmitPattern.UPDATE_USER)
  async updateUser(@Body() data: { idItem: string, body: CreateUserDto }) {
    const { idItem, body } = data
    return await this.userService.updateUser(idItem, body, { ressource: EmitPattern.UPDATE_USER });
  }
  @EventPattern(EmitPattern.SOFT_DELETE_USER)
  async softDelteUser(data: { idItem: string }) {
    return await this.userService.deleteUser(data.idItem, { ressource: EmitPattern.SOFT_DELETE_USER });
  }
}
