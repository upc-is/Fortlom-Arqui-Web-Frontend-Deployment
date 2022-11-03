import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Artist } from 'src/app/models/artist';
import { Tag } from 'src/app/models/Tag';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {


  basePath = 'https://fortlom-account.herokuapp.com/api/v1/userservice/artists';
  //basePath = 'http://localhost:8081/api/v1/userservice/artists';

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
getAll(): Observable<Artist> {
  return this.http.get<Artist>(this.basePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
getById(id: any): Observable<Artist> {
  return this.http.get<Artist>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
getUserByartistname(username: string): Observable<Artist> {
  return this.http.get<Artist>(`${this.basePath}/username/${username}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
getUserByartistnameandlastname(name: string,artistlastnmae:string): Observable<Artist> {
  return this.http.get<Artist>(`${this.basePath}/name/${name}/lastname/${artistlastnmae}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
create(item: any): Observable<Artist> {
  return this.http.post<Artist>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
createTag(artistId:number,item:any): Observable<Tag>{
  return this.http.post<Tag>(`${this.basePath}/artist/${artistId}/newtag`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}



update(id: any, item: any): Observable<Artist> {
  return this.http.put<Artist>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
updatefacebook(id: any, item: any): Observable<Artist> {
  return this.http.put<Artist>(`${this.basePath}/artist/${id}/FacebookAccount`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
updateinstgram(id: any, item: any): Observable<Artist> {
  return this.http.put<Artist>(`${this.basePath}/artist/${id}/InstagramAccount`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
updatetwitter(id: any, item: any): Observable<Artist> {
  return this.http.put<Artist>(`${this.basePath}/artist/${id}/TwitterAccount`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
delete(id: any) {
  return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
updateArtistPremium(artistId:number): Observable<Artist>
{
  return this.http.put<Artist>(`${this.basePath}/upgrade/${artistId}`,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
updateArtistBan(artistId:number): Observable<Artist>
{
  return this.http.put<Artist>(`${this.basePath}/ban/${artistId}`,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}
checkremiumartistid(artistId:number):Observable<boolean>{
  return this.http.get<boolean>(`${this.basePath}/checkpremium/${artistId}`,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}

checkartistid(artistId:number):Observable<boolean>{
  return this.http.get<boolean>(`${this.basePath}/check/${artistId}`,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));
}


}
