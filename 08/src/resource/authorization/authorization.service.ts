import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariable } from '../../common/environment-variable';
import { Tokens } from './entity/tokens';
import { PayloadInterface } from './interface/payload.interface';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariable, true>,
    private readonly jwtService: JwtService,
  ) {}

  async createTokens(payload: object): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY', {
          infer: true,
        }),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME', {
          infer: true,
        }),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY', {
          infer: true,
        }),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME', {
          infer: true,
        }),
      }),
    ]);
    const createdTokens = new Tokens({
      accessToken,
      refreshToken,
    });

    return createdTokens;
  }

  /**
   * updateTokensOrThrowException
   * @throws {TokenExpiredError|JsonWebTokenError|NotBeforeError}
   */
  async updateTokens(refreshToken: string): Promise<Tokens> {
    const { iat, exp, ...payload } = await this.jwtService.verifyAsync<
      { iat: number; exp: number } & PayloadInterface
    >(refreshToken, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY', {
        infer: true,
      }),
    });
    const updatedTokens = await this.createTokens(payload);

    return updatedTokens;
  }
}
