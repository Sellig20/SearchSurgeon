import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';

export interface surgeonInterface {
    surgeon: string;
    specialty: string;
    anesthsiste: string;
    nurse1: string;
    nurse2: string;
    roomNumber: number;
    intervention: string;
}

export interface roomInterface {
  surgeon: string;
  roomNumber: number;
}

export interface interventionInterface {
  surgeon: string;
  intervention: number;
}

@Injectable({
  providedIn: 'root'
})

export class SurgeonService {
  private apiUrl = 'http://localhost:3000/searchsurgeon/allSurgeons';

  constructor(private http: HttpClient) { }

  getSurgeons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}