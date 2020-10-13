import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private token = localStorage.getItem('token');

  private portfolioURL =
    'https://edocsapi.azurewebsites.net/Core6/api/Portfolio/ByUserId';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Digest username="{{appToken}}" realm="_root_" password=${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getPortfolio(): Observable<any> {
    return this.http
      .get<any>(this.portfolioURL)
      .pipe(catchError(this.handleError<any>('getPortfolio', [])));
  }

  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);

      // Let the app keep running by returning a safe empty result
      return of(result as T);
    };
  }
}
