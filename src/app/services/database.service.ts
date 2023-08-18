import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserDetailsI } from '../models/UserDetails';
import { Observable } from 'rxjs';
import { PaginatedReviewI, ReviewI } from '../models/ReviewModel';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  baseURL = 'http://localhost:3000/';
  generateNumberArray(endValue: number): number[] {
    return Array.from({ length: endValue }, (_, index) => index + 1);
  }

  sendData(endpoint: string, data: any) {
    return this.http.post(`${this.baseURL}${endpoint}`, data);
  }

  getData(endpoint: string) {
    return this.http.get<any>(`${this.baseURL}${endpoint}`);
  }

  getUserDetails(email: string) {
    return this.http.get<UserDetailsI[]>(
      `${this.baseURL}userInfos?email=${email}`
    );
  }

  updateUserDetails(id: number, data: any) {
    return this.http.put(`${this.baseURL}userInfos/${id}`, data);
  }

  getPaginatedReviews(page: number): Observable<any> {
    return this.http.get(`${this.baseURL}reviews?_page=${page}&_limit=4`);
  }
}
