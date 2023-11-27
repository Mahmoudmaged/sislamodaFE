import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  baseURL = `https://sislimoda.com/api/Option/`;
  token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
  }


  addOptionsItem(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);

  }
  updateOptions(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);

  }

  deleteOptionsItem(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?id=${id}`, {});
  }

  getOptionsItem(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll?`);
  }
  getOptionItemById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);
  }
}
