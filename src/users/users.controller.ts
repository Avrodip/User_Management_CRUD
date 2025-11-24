import { Controller, Post, Body, UseGuards, Patch, Param, Get, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequirePermission } from './guards/permission.decorator';
import { PermissionGuard } from './guards/permission.guard';

@Controller('users')
@UseGuards(PermissionGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequirePermission('CREATE')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  @RequirePermission('EDIT')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Get()
  @RequirePermission('VIEW')
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @RequirePermission('DELETE')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.usersService.delete(id);
    return { success: true };
  }

  @Get('managed/:id')
  managed(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getManagedUsersById(id);
  }
}
