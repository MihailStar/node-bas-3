import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { compare, hash } from 'bcrypt';
import { validateUuidPipe } from '../../common/validate-uuid-pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPassword } from './entity/user-without-password';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: UserWithoutPassword })
  async create(@Body() body: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(body.password, 10);
    const createdUser = await this.userService.create({
      login: body.login,
      password: hashedPassword,
    });

    return createdUser;
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserWithoutPassword,
    isArray: true,
  })
  async readAll(): Promise<User[]> {
    const users = await this.userService.readAll();

    return users;
  }

  /**
   * @throws {NotFoundException}
   */
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.OK, type: UserWithoutPassword })
  async read(@Param('id', validateUuidPipe) id: string): Promise<User> {
    const user = await this.userService.read(id);

    return user;
  }

  /**
   * @throws {NotFoundException|ForbiddenException}
   */
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.OK, type: UserWithoutPassword })
  async update(
    @Param('id', validateUuidPipe) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    const { password: oldHashedPassword } = await this.userService.read(id);
    const isOldPasswordMatch = await compare(
      body.oldPassword,
      oldHashedPassword,
    );

    if (!isOldPasswordMatch) {
      throw new ForbiddenException('Old password not match');
    }

    const newHashedPassword = await hash(body.newPassword, 10);
    const updatedUser = await this.userService.update(id, {
      oldPassword: oldHashedPassword,
      newPassword: newHashedPassword,
    });

    return updatedUser;
  }

  /**
   * @throws {NotFoundException}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async delete(@Param('id', validateUuidPipe) id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
