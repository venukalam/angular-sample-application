import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router,
    private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User|null>((localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject ? this.userSubject.value : null;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/user/login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, user);
  }

  getCounts() {
    return this.http.get(`${environment.apiUrl}/user/analytics`);
  }
}
