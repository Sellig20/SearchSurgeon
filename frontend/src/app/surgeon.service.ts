import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurgeonService {
  private apiUrl = 'http://localhost:3000/searchsurgeon/allSurgeons';

  constructor(private http: HttpClient) { }

  getSurgeons(): Observable<any[]> {
    console.log("\n\n-------> frontend surgeon service : ", this.http.get<any[]>(this.apiUrl));
    return this.http.get<any[]>(this.apiUrl);
  }
}
