import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
const BASE_URL = 'http://localhost:3000/api/Users/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(BASE_URL + 'login', user);
  }

  logout(): Observable<any> {
    return this.http.post<any>(BASE_URL + 'logout?access_token=' + localStorage.getItem('token'), new User());
  }

  ensureAuthenticated(): Observable<any> {
    const url = BASE_URL + 'confirm?uid=' + localStorage.getItem('user_id') + 'token=' + localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`
    // });
    // return this.http.get(url, { headers: headers });
    return this.http.get(url);
  }
}
