import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserIterface } from '../interface/user.interface';

export class User implements UserIterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  login: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 123456789 })
  createdAt: number;

  @ApiProperty({ example: 123456789 })
  updatedAt: number;

  /**
   * Excludes password when serializing
   */
  constructor(props: User) {
    this.id = props.id;
    this.login = props.login;
    this.password = props.password;
    this.version = props.version;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
