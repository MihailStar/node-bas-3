/* eslint "class-methods-use-this": "off" */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariable } from '../../../common/environment-variable';
import { PayloadInterface } from '../interface/payload.interface';

const configService = new ConfigService<EnvironmentVariable, true>();

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_REFRESH_KEY', {
        infer: true,
      }),
    });
  }

  async validate(
    timestampsAndPayload: { iat: number; exp: number } & PayloadInterface,
  ): Promise<object> {
    const { iat, exp, ...payload } = timestampsAndPayload;

    return payload;
  }
}
