import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY, Types } from '../../decorators/auth.decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Types[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();

    const { type } = request.user;

    return requiredRoles.some((role) => role === type);
  }
}
