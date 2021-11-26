import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Photo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + '/photos').pipe(
      map((response) => {
        return response;
      })
    );
  }

  update(photo: Photo): Observable<Photo> {
    return this.http
      .put<Photo>(environment.apiUrl + '/photos/' + photo.id, photo)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  create(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(environment.apiUrl + '/photos', photo).pipe(
      map((response) => {
        return response;
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + '/photos').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
