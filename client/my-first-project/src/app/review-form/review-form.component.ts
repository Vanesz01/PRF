import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../shared/services/book.service';
import { ReviewService } from '../shared/services/review.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/model/User';
// import { AuthService } from '../shared/services/auth.service';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
})
export class ReviewFormComponent implements OnInit {
  signupForm!: FormGroup;
  bookId: number = -1;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private reviewService: ReviewService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.bookId = params['bookId'];
    });
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });
    this.userService.getCurrent().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm.value);
      this.reviewService
        .save(this.signupForm.value, this.bookId, String(this.user._id))
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.bookService.addReview(data._id, this.bookId).subscribe({
              next: (data: any) => {
                console.log(data);
                window.location.reload();
              },
              error: (err) => {
                console.log(err);
              },
            });
            this.userService
              .addReview(data._id, String(this.user._id))
              .subscribe({
                next: (data: any) => {
                  console.log(data);
                  window.location.reload();
                },
                error: (err) => {
                  console.log(err);
                },
              });
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
