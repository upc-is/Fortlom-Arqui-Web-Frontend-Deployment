import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { LoginUser } from 'src/app/models/LoginUser';
import { JwtDTO } from 'src/app/models/JwtDTO';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  basePath =  'https://fortlom-account.herokuapp.com/auth';
  basePath2 = 'https://fortlom-account.herokuapp.com/api/v1/userservice/users/users/Username';
               
  constructor(private http:HttpClient) { }
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


  LogUser(item: LoginUser): Observable<JwtDTO>{

    return this.http.post<any>(`${this.basePath}/login`, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  
  
  }
  GetAdmin(name:string){
    return this.http.get<any>(`${this.basePath2}/${name}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
 


}
