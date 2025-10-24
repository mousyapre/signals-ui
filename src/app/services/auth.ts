// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  storeToken(token: any, userId: any) {
    sessionStorage.setItem('access_token', token);
    sessionStorage.setItem('user_id', userId);
    return true;
  }

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  
  registerUser(user: any): Observable<any> {
    console.log('Registering user:', user);
    return this.http.post<any>(`${this.baseUrl}/users/register`, user).pipe(
      catchError((error) => {
        console.log('Registration error:', error);
        return throwError(() => error);
      })
    );
  }
  // POST username + password to backend to get JWT token
  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/users/auth`; // or your /login endpoint
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.get<any>(url, {params});
  }

  // optionally get token from session
  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('access_token');
    }
    return null;
  }

  logout(): void {
    sessionStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;  // true if token exists
  }
}
