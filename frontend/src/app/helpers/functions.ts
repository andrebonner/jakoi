import { Role } from './role.enum';

export function isAdmin(role: Role): boolean {
  return role === Role.ADMIN;
}
