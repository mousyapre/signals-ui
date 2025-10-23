import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Snackbar } from '../../services/snackbar';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  isLoggedIn = false;
  menuOpen = false;
  constructor(private AuthService: Auth,private snackbar: Snackbar) {}
  ngOnInit(): void {
    this.isLoggedIn = this.AuthService.isLoggedIn();
  }

  logout(): void {
    this.AuthService.logout();
    this.isLoggedIn = false;
    this.snackbar.show('User logged in successfully!');
  }
}
