import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  baseURL = `https://sislimoda.com/api/Offers/`;
  // token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // this.token = localStorage.getItem("token")
  }


  allOffers(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);
  }

  allOffersByVendor(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllByVendor?VendorId=${id}`);
  }



  getOfferById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?id=${id}`);
  }

  addOffer(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);
  }

  updateOffer(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }

  deleteOfferById(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?id=${id}`, {});
  }

  deleteProductFromOfferById(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}RemoveProductFromOffer?id=${id}`, {});
  }
}
