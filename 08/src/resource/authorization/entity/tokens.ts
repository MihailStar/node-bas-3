import { ApiProperty } from '@nestjs/swagger';
import { TokensInterface } from '../interface/tokens.interface';

export class Tokens implements TokensInterface {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor(props: Tokens) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
