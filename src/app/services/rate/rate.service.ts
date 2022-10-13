import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Rate } from 'src/app/models/rate';
@Injectable({
  providedIn: 'root'
})
export class RateService {

  basePath = 'http://localhost:8085/api/v1/supportservice';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  
  constructor(private http: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
  
    return throwError('Something happened with request, please try again later');
  }
  
  // Create Rate
  create(artistid:number,fanaticid:number,item: any): Observable<Rate> {
    return this.http.post<Rate>(`${this.basePath}/artists/${artistid}/fanatics/${fanaticid}/rates`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Rate by id
  getById(id: any): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/rates/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  existbyartistoidandfanaticid(artistoid: number,fanaticid:number): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/check/${artistoid}/${fanaticid}/rates`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByartistId(id: any): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/artists/${id}/rates`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByartistIdandfanaticid(id: number,fanaticid:number): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/artists/${id}/fanatics/${fanaticid}/rates`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByfanaticId(id: any): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/fanatics/${id}/rates/`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All Rates
  getAll(): Observable<Rate> {
    return this.http.get<Rate>(`${this.basePath}/rates`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Rate
  update(rateId: number,review:Rate): Observable<Rate> {
    console.log(review)
    return this.http.put<Rate>(`${this.basePath}/update/${rateId}`, JSON.stringify(review), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Rate
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
