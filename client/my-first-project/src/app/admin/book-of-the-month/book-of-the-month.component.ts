import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../shared/services/book.service';
import { Book } from '../../shared/model/Book';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../shared/services/auth.service';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-book-of-month',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-of-the-month.component.html',
  styleUrl: './book-of-the-month.component.scss',
})
export class BookOfTheMonthComponent implements OnInit {
  signupForm!: FormGroup;
  selectedBook: number = -1;
  books?: Book[];
  book!: Book;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private bookService: BookService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      book: ['', [Validators.required]],
    });
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.bookService.getBookOfTheMonth().subscribe({
      next: (data) => {
        this.book = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.bookService.setBookOfTheMonth(this.book._id, false).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.bookService.setBookOfTheMonth(this.selectedBook, true).subscribe({
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
