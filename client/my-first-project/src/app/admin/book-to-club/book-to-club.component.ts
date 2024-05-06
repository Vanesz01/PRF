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
// import { AuthService } from '../shared/services/auth.service';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-book-to-club',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-to-club.component.html',
  styleUrl: './book-to-club.component.scss',
})
export class BookToClubComponent implements OnInit {
  signupForm!: FormGroup;
  books?: Book[];
  clubs?: Club[];
  selectedBook: number = -1;
  selectedClub: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private bookService: BookService,
    private clubService: ClubService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      book: ['', [Validators.required]],
      club: ['', [Validators.required]],
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
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.clubService.addBook(this.selectedBook, this.selectedClub).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.bookService.addClub(this.selectedBook, this.selectedClub).subscribe({
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
