import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [ConfigModule, JwtModule.register({}), UserModule],
  exports: [],
})
export class AuthorizationModule {}
