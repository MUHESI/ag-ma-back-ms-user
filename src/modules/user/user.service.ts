import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerResponse, } from 'src/helpers/server.response';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_SERVER_MESSAGE } from './dto/serverMessage';
import { UserEntity } from './entities/user.entity';
import { EmitPattern } from 'src/mc-config/config';
import { getPaginatedItems } from 'src/helpers/paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IBaseOptions } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  async create(resource: EmitPattern, user: CreateUserDto): Promise<any> {
    try {
      const u_ = await this.userRepository.findOneBy({ email: user.email })
      if (u_) {
        return new ServerResponse(
          { resource, status: HttpStatus.BAD_REQUEST, success: false },
          `${USER_SERVER_MESSAGE.CREATED_ERROR} | This email already exists.`,
          { item: null },
        ).throw();
      }
      const newUser = await this.userRepository.save(user);
      return new ServerResponse(
        { resource, status: HttpStatus.OK, success: true },
        `${USER_SERVER_MESSAGE.CREATED_SUCCESS}`,
        { item: newUser },
      ).throw();
    } catch (error) {
      return new ServerResponse(
        { resource, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.CREATED_ERROR} | Something went wrong.`,
        { item: null },
        error
      ).throw();
    }
  }
  async findOne(email: string): Promise<any | undefined> {
    return await this.userRepository.findOneBy({ email })
  }
  async getAllUsers(resource: EmitPattern): Promise<any | undefined> {
    try {
      const users = await this.userRepository.find(
        {
          order: {
            id: 'DESC',
          },
        }
      )
      return new ServerResponse(
        { resource, status: HttpStatus.OK, success: true },
        `${USER_SERVER_MESSAGE.GET_ALL_ITEMS_SUCCES}`,
        { items: users },
      ).throw();
    } catch (error) {
      return new ServerResponse(
        { resource, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.GET_ALL_ITEMS_ERROR}`,
        { items: [] },
        error
      ).throw();
    }
  }
  async getPaginatedUsers(resource: EmitPattern, options: IPaginationOptions): Promise<any | undefined> {
    try {
      const users = await getPaginatedItems<UserEntity>(
        this.userRepository,
        options,
      );
      return new ServerResponse(
        { resource, status: HttpStatus.OK, success: true },
        `${USER_SERVER_MESSAGE.GET_ALL_ITEMS_SUCCES}`,
        {
          items: users.items,
          meta: { ...users.meta, ...users.links }
        },
      ).throw();
    } catch (error) {
      return new ServerResponse(
        { resource, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.GET_ALL_ITEMS_ERROR}`,
        { items: [] },
        error
      ).throw();
    }
  }
  async getUserById(id: string, options?: IBaseOptions) {
    const user = await this.userRepository.findOneBy({ id });
    return new ServerResponse(
      { resource: options.ressource, status: HttpStatus.OK, success: true },
      `${USER_SERVER_MESSAGE.GET_ITEM_BY_ID}`,
      { item: user },
    ).throw();
  }
  async deleteUser(id: string, options?: IBaseOptions) {
    // TODO: Add async validation later
    const user = await this.userRepository.softDelete({ id });
    return new ServerResponse(
      { resource: options.ressource, status: HttpStatus.OK, success: true },
      `${USER_SERVER_MESSAGE.DELETE_SUCCESS}`,
      { item: user },
    ).throw();
  }
  async updateUser(id: string, user: CreateUserDto, options?: IBaseOptions) {
    const oldUser = await this.userRepository.update(id, user);
    if (!oldUser) {
      return new ServerResponse(
        { resource: options.ressource, status: HttpStatus.BAD_REQUEST, success: false },
        `${USER_SERVER_MESSAGE.UPDATE_ERROR}`,
        { item: {} },
        null
      ).throw();
    }
    return new ServerResponse(
      { resource: options.ressource, status: HttpStatus.OK, success: true },
      `${USER_SERVER_MESSAGE.UPDATE_SUCCESS}`,
      { item: oldUser },
    ).throw();
  }
}
