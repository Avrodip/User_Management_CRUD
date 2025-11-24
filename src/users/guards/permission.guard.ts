import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { ROLE_DEFINITIONS } from '../constants';
import { UsersService } from '../users.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(PERMISSION_KEY, context.getHandler());
    // If route has no permission metadata, allow
    if (!requiredPermission) return true;

    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth) throw new ForbiddenException('Authorization header (user id) required.');

    const userId = Number(auth);
    if (Number.isNaN(userId)) throw new ForbiddenException('Invalid Authorization header. Supply numeric user id.');

    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User in Authorization header not found.');

    const permissions = new Set<string>();
    for (const roleCode of user.roles) {
      const def = ROLE_DEFINITIONS.find(r => r.code === roleCode);
      if (def) def.permissions.forEach(p => permissions.add(p));
    }

    if (!permissions.has(requiredPermission)) {
      throw new ForbiddenException('ERROR: Not allowed to perform action due to insufficient permissions.');
    }

    (req as any).user = user;
    return true;
  }
}
