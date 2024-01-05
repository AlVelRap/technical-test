import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fatigue } from '../models/fatigue.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FatigueService {
  FATIGUE_ROUTE: string = 'http://localhost:3000/api/rest/1/fatigue/';
  constructor(private http: HttpClient) {}

  create(fatigue: Fatigue): Observable<any> {
    return this.http.post<any>(`${this.FATIGUE_ROUTE}`, fatigue);
  }

  findByPlayer(id_player: string): Observable<any> {
    return this.http.get<any>(`${this.FATIGUE_ROUTE}player/${id_player}`);
  }
}
