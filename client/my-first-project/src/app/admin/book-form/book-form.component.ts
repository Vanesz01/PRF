import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../shared/services/book.service';
// import { AuthService } from '../shared/services/auth.service';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.bookService.save(this.signupForm.value).subscribe({
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
