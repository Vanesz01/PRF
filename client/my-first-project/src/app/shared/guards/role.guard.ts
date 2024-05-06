import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { RoleService } from './role.service';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private roleService: RoleService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.userService.getCurrent().subscribe({
      next: (data: any) => {
        console.log(data);
        const requiredRoles = route.data['roles'];
        if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
          console.log(true);
          return true;
        }
        return requiredRoles.every((role) => data.role.includes(role));
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });

    return false;
  }
}
