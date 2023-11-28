import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseURL = `https://sislimoda.com/api/Notifications/`;
  // token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // this.token = localStorage.getItem("token")
  }


  allNotification(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);
  }

  deleteById(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?Id=${id}`, {});
  }

  addNotification(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);
  }

  updateNotification(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }

  getById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);
  }






}
