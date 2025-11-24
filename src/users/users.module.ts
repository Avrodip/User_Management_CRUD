import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PermissionGuard } from './guards/permission.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PermissionGuard,
  ],
})
export class UsersModule {}
