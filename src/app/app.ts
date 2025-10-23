import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { NavBar } from './components/nav-bar/nav-bar';
import { Snackbar } from './services/snackbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Footer,NavBar,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('signals-ui');
  showSnackBar = false;
  snackBarMessage = '';
  constructor(private snackbar: Snackbar ) {}
  ngOnInit() {
    this.snackbar.message$.subscribe(message => {
      this.snackBarMessage = message;
    });
    this.snackbar.visible$.subscribe(visible => {
      this.showSnackBar = visible;
    });
  }

}
