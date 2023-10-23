import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  [key: string]: any;
}

export interface UsersAPIResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://dummyjson.com/users?limit=0';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UsersAPIResponse> {
    return this.http.get<UsersAPIResponse>(this.apiUrl);
  }
}
