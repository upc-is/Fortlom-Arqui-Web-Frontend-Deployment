import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Report } from 'src/app/models/report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

 // basePath = 'https://fortlom-report.herokuapp.com/api/v1/reportservice';
 basePath = 'http://localhost:8087/api/v1/reportservice';
  
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
  
  // Create Report
  createforcomment(item: any,UserMainId:number,UserReportedId:number,commentid:number): Observable<Report> {

    return this.http.post<Report>(`${this.basePath}/usersmains/${UserMainId}/usersreports/${UserReportedId}/comments/${commentid}/complaints`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  createforforum(item: any,UserMainId:number,UserReportedId:number,forumid:number): Observable<Report> {

    return this.http.post<Report>(`${this.basePath}/usersmains/${UserMainId}/usersreports/${UserReportedId}/forums/${forumid}/complaints`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  createforpublications(item: any,UserMainId:number,UserReportedId:number,publishedId:number): Observable<Report> {

    return this.http.post<Report>(`${this.basePath}/usersmains/${UserMainId}/usersreports/${UserReportedId}/publications/${publishedId}/complaints`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  // Get Report by id
  getById(id: any): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/complaints/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getBycommentid(id: any,): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/comments/${id}/complaints`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByforumid(id: any,): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/forums/${id}/complaints`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getBypublicationsid(id: any,): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/publications/${id}/complaints`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByusersmainsid(id: any,): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/usersmains/${id}/complaints`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getByuserreportedsid(id: any,): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/usersreports/${id}/complaints`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  // Get All Reports
  getAll(): Observable<Report> {
    return this.http.get<Report>(`${this.basePath}/complaints`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  
  
  
  // Delete Report
  delete(id: any) {
    return this.http.delete(`${this.basePath}/complaints/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
