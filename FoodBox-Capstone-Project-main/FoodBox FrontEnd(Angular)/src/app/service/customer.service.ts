import { Observable } from 'rxjs';
import { Customer } from './../model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL="http://localhost:8084/customers";
  constructor(private httpClient:HttpClient) { }

  addCustomer(customer:Customer):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,customer);
  }

  customerLogin(loginData:any):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/${loginData.email}`,loginData);
  }

  getCustomers():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}`);
  }

  searchCustomer(keyword:any):Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}/search/${keyword}`);
  }

  deleteCustomer(email:string):Observable<Customer>{
    return this.httpClient.delete<Customer>(`${this.baseURL}/${email}`);
  }

  getCustomer(cust_email:string):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/${cust_email}`);
  }
}
