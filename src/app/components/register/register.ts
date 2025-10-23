import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Snackbar } from '../../services/snackbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,private authService:Auth,private snackbarService: Snackbar, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  // Custom validator to check if passwords match
  passwordsMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.registerForm || this.registerForm.invalid) {
      this.errorMessage = this.registerForm?.errors?.['passwordsMismatch'] 
        ? 'Passwords do not match.' 
        : 'Please fill all required fields correctly.';
      return;
    }

    const user = this.registerForm.value;
    this.authService.registerUser(user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.snackbarService.show('User Registered successfully!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed.';
      }
    });
  }
}
