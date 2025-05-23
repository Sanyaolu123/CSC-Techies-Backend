import { RoleTypes } from '@/enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleTypes[]) => SetMetadata(ROLES_KEY, roles);
