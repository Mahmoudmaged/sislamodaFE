import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL = `https://sislimoda.com/api/Orders/`;
  token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
  }


  getOrderList(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll?Id=${id}`);

  }
  GetVendorOrderedProductByIDs(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetVendorOrderedProduct?VendorId=${id}`);

  }
  getOrderById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);

  }
  deleteOrderById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);

  }

  updateOrderStatus(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}UpdateStatus?Id=${data.Id}&Value=${data.Value}&Name=${data.Name}`, {});

  }
}
