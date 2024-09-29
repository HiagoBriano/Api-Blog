import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../infra/providers/auth-guard.provider';
import { RolesGuard } from '../infra/providers/roles-guard.provider';

export const ROLES_KEY = 'roles';

export enum Types {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export function Auth(...roles: Types[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
