import { Injectable } from '@angular/core';
import { UserRole } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // Simulate user roles (replace with actual user roles from authentication)
  private userRoles: string[] = [UserRole.ADMIN, UserRole.USER];

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  // Other role-related methods can be added here
}
