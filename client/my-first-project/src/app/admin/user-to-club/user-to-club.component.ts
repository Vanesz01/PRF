import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../shared/services/book.service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../shared/model/Book';
import { Club } from '../../shared/model/Club';
import { ClubService } from '../../shared/services/club.service';
import { User } from '../../shared/model/User';
import { UserService } from '../../shared/services/user.service';
// import { AuthService } from '../shared/services/auth.service';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-user-to-club',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-to-club.component.html',
  styleUrl: './user-to-club.component.scss',
})
export class UserToClubComponent implements OnInit {
  signupForm!: FormGroup;
  users?: User[];
  clubs?: Club[];
  selectedUser: number = -1;
  selectedClub: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private userService: UserService,
    private clubService: ClubService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      club: ['', [Validators.required]],
    });
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.clubService.getAll().subscribe({
      next: (data) => {
        this.clubs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm.value);
      this.clubService.addUser(this.selectedUser, this.selectedClub).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.userService.addClub(this.selectedUser, this.selectedClub).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Form is not valid.');
    }
  }
}
