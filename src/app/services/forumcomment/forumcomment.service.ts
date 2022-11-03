import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Forumcomment } from 'src/app/models/forumcomment';
@Injectable({
  providedIn: 'root'
})
export class ForumcommentService {

 basePath =  'https://fortlom-answer.herokuapp.com/api/v1/answerservice'
 //basePath =  'http://localhost:8084/api/v1/answerservice'
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
  
  // Create ForumComment
  create(item: any,userId:number,forumId:number): Observable<Forumcomment> {
    return this.http.post<Forumcomment>(`${this.basePath}/user/${userId}/forums/${forumId}/forumcomments`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get ForumComment by id
  getById(id: any): Observable<Forumcomment> {
    return this.http.get<Forumcomment>(`${this.basePath}/forumcomments/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get All ForumComments
  getAll(): Observable<Forumcomment> {
    return this.http.get<Forumcomment>(`${this.basePath}/forumcomments`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  
 
  
  // Delete ForumComment
  delete(id: any) {
    return this.http.delete(`${this.basePath}/forumcomments/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  
  getallcommentsperforum(id:number){
  
    return this.http.get<Forumcomment>(`${this.basePath}/forums/${id}/forumcomments`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  
  }
 

}
