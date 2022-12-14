import { Injectable, CanActivate, ExecutionContext ,HttpException , HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user)
    const check = requireRoles.some((role) => user.roles.includes(role));
    if(!check){
      throw new HttpException('Not Allowed', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
