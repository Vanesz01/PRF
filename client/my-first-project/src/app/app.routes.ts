import { Routes } from '@angular/router';
import { RoleGuard } from './shared/guards/role.guard';
import { UserRole } from './shared/model/User';
import { authGuard, AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'user-management',
    loadComponent: () =>
      import('./user-management/user-management.component').then(
        (c) => c.UserManagementComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((c) => c.AdminComponent),
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.ADMIN],
    },
  },
  {
    path: 'clubs/:clubId',
    loadComponent: () =>
      import('./book-list/book-list.component').then(
        (c) => c.BookListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'clubs',
    loadComponent: () =>
      import('./club-list/club-list.component').then(
        (c) => c.ClubListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'clubs/:clubId/books/:bookId',
    loadComponent: () =>
      import('./review-list/review-list.component').then(
        (c) => c.ReviewListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-page',
    loadComponent: () =>
      import('./user/user.component').then((c) => c.UserComponent),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
