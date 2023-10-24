import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

const API_URL = 'https://dummyjson.com/users';

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

interface UserInfo {
  dateOfBirth: string | null;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  feTechnology?: null | undefined;
  feTechnologyVersion?: string | null | undefined;
  email?: string | null | undefined;
  hobbies?: unknown[] | undefined;
  id?: number | undefined;
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
    return this.http.get<UsersResponse>(this.apiUrl + '?limit=0&select=email');
  }

  /**
   * Sends results to the server.
   */
  addNewUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.apiUrl + '/add', userInfo);
  }
}
