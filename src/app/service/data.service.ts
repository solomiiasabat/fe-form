import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

const API_URL = 'https://dummyjson.com/users?limit=0&select=email';

interface User {
  id: number;
  email: string;
}

interface UsersResponse {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}

/**
 * Service to handle data operations related to users.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) {}

  /**
   * Fetches all users.
   */
  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.apiUrl);
  }
}
