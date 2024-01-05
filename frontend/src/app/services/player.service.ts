import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  PLAYER_ROUTE: string = 'http://localhost:3000/api/rest/1/player/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.PLAYER_ROUTE}`);
  }
  getOne(id_player:string): Observable<any> {
    return this.http.get<any>(`${this.PLAYER_ROUTE}/${id_player}`);
  }
}
