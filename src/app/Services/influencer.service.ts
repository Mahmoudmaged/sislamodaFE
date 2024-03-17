import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfluencerService {

  baseURL = `https://sislimoda.com/api/Influencer/`;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
  }



  getAllInfluencerList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);
  }

  getInfluencerById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);
  }


  deleteInfluencer(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?Id=${id}`, {});
  }

  updateInfluencer(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }

  addInfluencer(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);
  }


}
