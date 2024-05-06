import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Club } from '../shared/model/Club';
import { BookService } from '../shared/services/book.service';
import { Book } from '../shared/model/Book';
import { ClubService } from '../shared/services/club.service';
import { Review } from '../shared/model/Review';
import { ReviewService } from '../shared/services/review.service';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, ReviewFormComponent, HeaderComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {
  reviews?: Review[];
  book?: Book;
  bookId: number = -1;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private bookService: BookService,
    private clubService: ClubService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private reviewService: ReviewService
  ) {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
    });
  }

  ngOnInit() {
    this.bookService.getBook(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.reviewService.getReviewsForBook(this.bookId).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
