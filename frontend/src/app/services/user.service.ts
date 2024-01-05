import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_ROUTE: string = 'http://localhost:3000/api/rest/1/user/';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(
      localStorage.getItem('token') != null
    );
    this.currentUserData = new BehaviorSubject<String>(
      localStorage.getItem('token') || ''
    );
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.USER_ROUTE}login`, user).pipe(
      tap((userData) => {
        localStorage.setItem('token', userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.USER_ROUTE}register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error('Codigo de Error: ', error);
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
