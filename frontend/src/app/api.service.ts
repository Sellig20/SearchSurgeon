import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/`, { responseType: 'text' as 'json' });
  }
}