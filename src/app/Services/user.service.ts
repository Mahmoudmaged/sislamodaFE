import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = `https://sislimoda.com/api/User/`;
  token: any = `Hamada__` + localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = `Hamada__` + localStorage.getItem("token")
  }


  allUsers(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);
  }

  deleteUser(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?id=${id}`, {});
  }
  getById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`, {});
  }

  updateUser(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }

  addUser(data: any): Observable<any> {
    return this._HttpClient.post(`https://sislimoda.com/api/Auth/RegisterUser`, data);
  }
}
