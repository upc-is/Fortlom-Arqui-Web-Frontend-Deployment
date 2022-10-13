import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Follow } from 'src/app/models/follow';

@Injectable({
  providedIn: 'root'
})
export class FollowService {


  basePath =  'http://localhost:8085/api/v1/supportservice';
  
  
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
  
  // Create Follow
  create(fanaticid:number,artistid:number,boolfollow:boolean): Observable<Follow> {
    return this.http.post<Follow>(`${this.basePath}/artists/${artistid}/fanatics/${fanaticid}/boolfollow/${boolfollow}/follows`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Follow by id
  getById(id: any): Observable<Follow> {
    return this.http.get<Follow>(`${this.basePath}/follows/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByartistsId(id: any): Observable<Follow> {
    return this.http.get<Follow>(`${this.basePath}/artists/${id}/follows`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  existsByfanaticacheckd(artistsid: number,agree:boolean): Observable<Follow> {
    return this.http.get<Follow>(`${this.basePath}/check/${artistsid}/${agree}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  existsByfanaticartistsId(artistsid: number,fanatic:number): Observable<Follow> {
    return this.http.get<Follow>(`${this.basePath}/check/${artistsid}/fanatics/${fanatic}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByfanaticartistsId(artistsid: number,boolagree:boolean): Observable<Follow> {
    return this.http.get<Follow>(`${this.basePath}/artists/${artistsid}/agreess/${boolagree}/opinions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  // Get All Follows
  getAll(): Observable<Follow> {
    return this.http.get<Follow>(`${this.basePath}/follows`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Update Follow
  update(followid: number,boolfollow:boolean ): Observable<Follow> {
    return this.http.put<Follow>(`${this.basePath}/update/${followid}/follow/${boolfollow}`,  this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Delete Follow
  delete(id: any) {
    return this.http.delete(`${this.basePath}/follows/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
