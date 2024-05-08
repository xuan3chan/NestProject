import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ,ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService] // export UsersService so it can be used in other modules
})
export class UsersModule {}