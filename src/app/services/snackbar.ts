import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Snackbar {
  private _message = new BehaviorSubject<string>('');
  private _visible = new BehaviorSubject<boolean>(false);

  message$ = this._message.asObservable();
  visible$ = this._visible.asObservable();

  show(message: string, duration: number = 3000) {
    this._message.next(message);
    this._visible.next(true);
    setTimeout(() => this._visible.next(false), duration);
  }

  hide() {
    this._visible.next(false);
  }
}
