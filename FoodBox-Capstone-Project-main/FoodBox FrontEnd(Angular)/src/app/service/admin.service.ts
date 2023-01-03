import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL="http://localhost:8084/admin"
  constructor(private httpClient:HttpClient) { }

  adminLogin(loginData:any):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${loginData.username}`,loginData);
  }
}
