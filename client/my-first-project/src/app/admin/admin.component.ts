import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { BookFormComponent } from './book-form/book-form.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { BookToClubComponent } from './book-to-club/book-to-club.component';
import { UserToClubComponent } from './user-to-club/user-to-club.component';
import { BookOfTheMonthComponent } from './book-of-the-month/book-of-the-month.component';
import { HeaderComponent } from '../header/header.component';
import { BookService } from '../shared/services/book.service';
import { Book } from '../shared/model/Book';
import { Club } from '../shared/model/Club';
import { User } from '../shared/model/User';
import { ClubService } from '../shared/services/club.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ReviewService } from '../shared/services/review.service';
import { Review } from '../shared/model/Review';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BookFormComponent,
    ClubFormComponent,
    BookToClubComponent,
    UserToClubComponent,
    BookOfTheMonthComponent,
    HeaderComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  books!: Book[];
  clubs!: Club[];
  users!: User[];
  reviews!: Review[];

  constructor(
    private bookService: BookService,
    private clubService: ClubService,
    private userService: UserService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
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
    this.reviewService.getAll().subscribe({
      next: (data) => {
        console.log(data, 'review');
        this.reviews = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteClub(clubId: number) {
    this.clubService.deleteClub(clubId).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteBook(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDeleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: (data: any) => {
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
