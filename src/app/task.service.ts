import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private token = localStorage.getItem('token');

  private taskURL = 'https://edocsapi.azurewebsites.net/Core6/api/Tasks/ByUser';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Digest username="{{appToken}}" realm="_root_" password=${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getTask(): Observable<any> {
    return this.http
      .get<any>(this.taskURL, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getTask', [])));
  }

  private handleError<T>(operation = 'operation', result: T): any {
    return (error: any): Observable<T> => {
      console.error(error, operation);

      return of(result as T);
    };
  }
}
