import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { compare, hash } from 'bcrypt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthorizationService } from './authorization.service';
import { Public } from './decorator/public.decorator';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Tokens } from './entity/tokens';
import { PayloadInterface } from './interface/payload.interface';

@Controller('auth')
@ApiTags('Authorization')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  async registerUser(@Body() body: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(body.password, 10);
    const createdUser = await this.userService.create({
      login: body.login,
      password: hashedPassword,
    });

    return createdUser;
  }

  /**
   * @throws {ForbiddenException}
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Tokens })
  async authorizeUser(@Body() body: AuthorizeUserDto): Promise<Tokens> {
    const users = await this.userService.readAll();
    const foundUser = users.find(({ login }) => login === body.login);

    if (foundUser === undefined) {
      throw new ForbiddenException('Login not exist');
    }

    const { password: hashedPassword } = foundUser;
    const isPasswordMatch = await compare(body.password, hashedPassword);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Password not match');
    }

    const payload: PayloadInterface = {
      userId: foundUser.id,
      login: foundUser.login,
    };
    const tokens = await this.authorizationService.createTokens(payload);

    return tokens;
  }

  /**
   * @throws {ForbiddenException}
   */
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Tokens })
  async refreshTokens(@Body() body: RefreshTokensDto): Promise<Tokens> {
    let tokens: Tokens;

    try {
      tokens = await this.authorizationService.updateTokens(body.refreshToken);
    } catch (reason) {
      if (reason instanceof Error) {
        switch (reason.name) {
          case 'TokenExpiredError':
            throw new ForbiddenException('Token expired');
          case 'JsonWebTokenError':
          case 'NotBeforeError':
            throw new ForbiddenException('Token invalid');
          default:
            throw reason;
        }
      }

      throw reason;
    }

    return tokens;
  }
}
