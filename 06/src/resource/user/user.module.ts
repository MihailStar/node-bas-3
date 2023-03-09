import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [forwardRef(() => FavoritesModule)],
  exports: [UserService],
})
export class UserModule {}
