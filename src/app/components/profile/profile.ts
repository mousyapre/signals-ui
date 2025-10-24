import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../services/users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})

export class Profile {
  user: any = {};
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private userService: User,private route: ActivatedRoute,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const userId = Number(idParam);
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.cdr.detectChanges();
        console.log("got user details",this.user);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load user profile';
        this.cdr.detectChanges();
      }
    });
    console.log('Loaded user profile for user ID:', userId);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
