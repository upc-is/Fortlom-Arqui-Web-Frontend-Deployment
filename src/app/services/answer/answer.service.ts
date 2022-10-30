import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Opinion } from 'src/app/models/Opinion';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  //basePath ='https://fortlom-answer.herokuapp.com/api/v1/answerservice';
  
  basePath ='http://localhost:8084/api/v1/answerservice';
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
  getAll(): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/opinions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getOpinionById(opinionId:number): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/opinions/${opinionId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  createOpinion(usersId:number,contentid:number,item:Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(`${this.basePath}/user/${usersId}/content/${contentid}/opinions`,JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  delete(opinionId:number): Observable<Opinion> {
    return this.http.delete<Opinion>(`${this.basePath}/opinions/${opinionId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAllOpinionsBycontentId(contentid:number): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/content/${contentid}/opinions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAllOpinionsByuserId(userId:number): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/users/${userId}/opinions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAllOpinionsByagree(boolagree:boolean): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/agreess/${boolagree}/opinions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAllOpinionsByagreeandContentId(contentid:number,boolagree:boolean): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/content/${contentid}/agreess/${boolagree}/opinions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  exists(contentid:number,userId:number): Observable<Opinion> {
    return this.http.get<Opinion>(`${this.basePath}/check/${contentid}/${userId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  updateOpinion(opinionid:number,boolagree:boolean): Observable<Opinion> {
    return this.http.put<Opinion>(`${this.basePath}/update/${opinionid}/agree/${boolagree}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
