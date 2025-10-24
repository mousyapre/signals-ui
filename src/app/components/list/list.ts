import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { User } from '../../services/users';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css'] // ✅ must be plural
})
export class List {
  users: any[] = [];
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private userService: User,
    private cdr:ChangeDetectorRef // ✅ inject Angular’s zone
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    console.log("printing on init");
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
      this.users = data;
      this.loading = false;
      this.cdr.detectChanges();
      console.log('Users loaded:', this.users);
      },
      error: (error) => {
          console.error('Error fetching users:', error);
          this.errorMessage = 'Failed to load user data';
          this.loading = false;
          this.cdr.detectChanges();
      }
    });
  }
}
