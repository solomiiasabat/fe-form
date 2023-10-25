import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

const API_URL = 'https://dummyjson.com/users';

// Server responce form to work with in the component.
interface User {
  id: number;
  email: string;
}

// Server response form.
interface UsersResponse {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}

// Form interface that will be sent to the server.
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
   * Checks if the email exists.
   */

  emailExists(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((response) => response.users.some((user) => user.email === email))
    );
  }

  /**
   * Sends results to the server.
   */
  addNewUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.apiUrl + '/add', userInfo);
  }
}
