import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { User, UserRole } from '../model/User';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const r = inject(Router);
  let user: User;
  userService.getCurrent().subscribe({
    next: (data: any) => {
      console.log(data);
      user = data;
    },
    error: (err) => {
      console.log(err);
    },
  });
  return inject(AuthService)
    .checkAuth()
    .pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          // navigation
          r.navigateByUrl('/login');
          return false;
        } else {
          const requiredRoles = route.data['roles'];
          if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
            return true;
          }
          console.log(
            requiredRoles.every((role) => user.role.includes(role)),
            'contains'
          );
          return requiredRoles.every((role) => user.role.includes(role));
        }
      }),
      catchError((error) => {
        console.log(error);
        r.navigateByUrl('/login');
        return of(false);
      })
    );
};

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      const expectedRole = next.data['roles'];
      const isAuthenticated = await this.authService.checkAuth().toPromise();

      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
        return false;
      }

      const currentUser = await this.userService.getCurrent().toPromise();
      if (!(expectedRole instanceof Array) || expectedRole.length === 0) {
        return true;
      }
      // if (!currentUser || currentUser.role !== expectedRole) {
      //   this.router.navigate(['/access-denied']);
      //   return false;
      // }

      const value = expectedRole.every((role) =>
        currentUser!.role.includes(role)
      );
      if (!value) {
        this.router.navigateByUrl('/clubs');
      }
      return value;
    } catch (error) {
      console.error(error);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

// import { Injectable, inject } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import { catchError, flatMap, map } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { UserRole } from '../model/User';
// import { UserService } from '../services/user.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: UserService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> {
//     const expectedRole = next.data['role'] as UserRole;
//     return inject(AuthService)
//       .checkAuth()
//       .pipe(
//         flatMap((isAuthenticated) => {
//           if (!isAuthenticated) {
//             this.router.navigateByUrl('/login');
//             return of(false);
//           } else {
//             return this.authService.getCurrent().pipe(
//               map((currentUser) => {
//                 if (currentUser && currentUser.role === expectedRole) {
//                   return true;
//                 } else {
//                   this.router.navigate(['/access-denied']);
//                   return false;
//                 }
//               })
//             );
//           }
//         }),
//         catchError((error) => {
//           console.error(error);
//           this.router.navigateByUrl('/login');
//           return of(false);
//         })
//       );
//   }
// }
