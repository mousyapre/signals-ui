import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class User {
  private baseUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient,private authService:Auth) {}

  getAllUsers(): Observable<any> {
    const token = this.authService.getToken(); // Assume authService is available globally
    console.log('Using token:', token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.baseUrl, { headers });
  }

  getUserById(id: number): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any>(`${this.baseUrl}${id}`, { headers });
}

}
