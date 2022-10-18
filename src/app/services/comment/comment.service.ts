
import { Injectable } from '@angular/core';


import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Comment } from 'src/app/models/comment';





@Injectable({
  providedIn: 'root'
})
export class CommentService {

  basePath =  'https://fortlom-answer.herokuapp.com/api/v1/answerservice'
 

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

// Create Comment
create(item: any,userId:number,publicationId:number): Observable<Comment> {
  return this.http.post<Comment>(`${this.basePath}/user/${userId}/publications/${publicationId}/publicationcomments`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get Comment by id
getById(id: any): Observable<Comment> {
  return this.http.get<Comment>(`${this.basePath}/publicationcomments/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get All Comments
getAll(): Observable<Comment> {
  return this.http.get<Comment>(`${this.basePath}/publicationcomments`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}


getallcommentsbypublication(id:number){

  return this.http.get<Comment>(`${this.basePath}/publications/${id}/publicationcomments`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
// Delete Comment
delete(id: any) {
  return this.http.delete(`${this.basePath}/publicationcomments/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}



















}
