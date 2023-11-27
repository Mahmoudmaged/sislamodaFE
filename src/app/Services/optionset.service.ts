import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionSetService {

  baseURL = `https://sislimoda.com/api/OptionSet/`;
  token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
  }


  addOptionSet(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);

  }
  updateOptionSet(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);

  }

  deleteOptionSet(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?id=${id}`, {});
  }

  getOptionSet(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll?`);
  }
  getOptionSetById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);
  }
}
