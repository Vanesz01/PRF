import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClubService } from '../../shared/services/club.service';
// import { AuthService } from '../shared/services/auth.service';

// FormsModule, ReactiveFormsModule

@Component({
  selector: 'app-club-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './club-form.component.html',
  styleUrl: './club-form.component.scss',
})
export class ClubFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm.value);
      this.clubService.save(this.signupForm.value).subscribe({
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
