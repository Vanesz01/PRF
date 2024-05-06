import { Component } from '@angular/core';
import { User, UserRole } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user!: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getCurrent().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigateToBookClub() {
    this.router.navigateByUrl('/clubs');
  }

  navigateToUserPage() {
    if (this.user.role === UserRole.ADMIN) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/user-page');
    }
  }
}
