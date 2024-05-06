import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [''],
      address: [''],
      nickname: [''],
    });
    this.userService.getCurrent().subscribe({
      next: (data: any) => {
        this.user = data;
        this.form.patchValue(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.userService
      .changeUserData(
        this.user._id,
        this.form.get('name')?.value,
        this.form.get('nickname')?.value,
        this.form.get('address')?.value
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
