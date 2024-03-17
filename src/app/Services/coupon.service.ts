import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  baseURL = `https://sislimoda.com/api/Coupon/`;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
  }



  getAllCouponList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);
  }

  getCouponById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);
  }


  getCouponByCodeAndUser(code: string, userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetByCodeAndUser?code=${code}&userid=${userId}`);
  }

  getCouponByCode(code: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetByCodeAndUser?GetByCode=${code}`);
  }


  deleteCoupon(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?Id=${id}`, {});
  }

  updateCoupon(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }

  addCoupon(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);
  }

  addUserToCoupon(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}AddUserToCoupon`, data);
  }

  removeUserFromCoupon(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}RemoveUserFromCoupon?Id=${id}`, {});
  }
}
