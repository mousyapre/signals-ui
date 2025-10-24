// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Snackbar } from '../../services/snackbar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loading = false;
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackbar: Snackbar
  ) {}

  ngOnInit(): void {
    //  Initialization logic if needed
  if (this.authService.isLoggedIn()) {
    setTimeout(() => {
      this.snackbar.show('User is already logged in!');
      this.router.navigate(['/']);
    });
  }
    // initialize form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Login form submitted');
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.loading = true;
    this.errorMessage = null;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        // ✅ Store token in session storage
        console.log('Login successful:', response);
        if (response && response.token) {
          this.authService.storeToken(response.token, response.userId);
          console.log('Token stored in sessionStorage');
          // window.location.reload(); // Reload to update state across the app
          this.isLoggedIn = true;
          this.snackbar.show('User logged in successfully!');
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid server response';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password';
        this.loading = false;
        
      }
    });
  }
}
