import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Journal } from '../components/types/Journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = "http://localhost:3000/journals"

  constructor(private http: HttpClient) { }

  getJournals(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.apiUrl)
  }
}
