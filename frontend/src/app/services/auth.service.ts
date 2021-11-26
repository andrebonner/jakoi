import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Auth, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Auth>(
      JSON.parse(sessionStorage.getItem('user')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }
  check(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.http
        .post<any>(
          environment.apiUrl + '/auth',
          {},
          { headers: { Authorization: 'Bearer ' + token } }
        )
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  login(user: Auth): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/login', user).pipe(
      map((result) => {
        user.id = result.user.id;
        user.email = result.user.email;
        user.password = '';
        user.role = result.user.role;
        user.createdAt = result.user.createdAt;
        user.token = result.token;

        sessionStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return result;
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.currentUserSubject.next({ username: '', password: '', role: 0 });
  }

  forgotPassword(user: Auth): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/auth/forgot-password', user)
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        })
      );
  }

  verifyEmailToken(user: Auth): Observable<any> {
    return this.http
      .get<any>(
        environment.apiUrl + '/auth/forgot-password?token=' + user.token
      )
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        })
      );
  }
  resetPassword(user: Auth): Observable<any> {
    return this.http
      .put<any>(environment.apiUrl + '/auth/reset-password', user, {
        headers: { authorization: `Bearer ${user.token}` },
      })
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/auth/register', user)
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        })
      );
  }
}
