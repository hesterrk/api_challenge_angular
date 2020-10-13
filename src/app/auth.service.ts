import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from './login/user';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData } from './login/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersURL = 'https://edocsapi.azurewebsites.net/Auth/api/Login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Digest username="{{appToken}}" realm="_root_" password=""',
    }),
  };

  constructor(private http: HttpClient) {}

  postUser(user: User): Observable<any> {
    return this.http
      .post<User>(this.usersURL, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}


