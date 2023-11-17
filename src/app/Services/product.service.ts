import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = `https://sislimoda.com/api/Product/`;
  token: any = localStorage.getItem("token");

  id!: string
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
    this.id = JSON.parse(localStorage.getItem('user')!)?.id;

  }


  getProductWithId(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`)
  }
  getProductsList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);

  }
  getProductsListByVendor(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllByVendor?VendorId=${id}`);

  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?Id=${id}`);

  }

  getOptionList(): Observable<any> {
    return this._HttpClient.get(`https://sislimoda.com/api/Option/GetAll`);

  }

  addProduct(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);

  }

  updateProduct(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);

  }

  deleteProductById(id: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?id=${id}`, {});
  }
  getByCategory(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllByCategoryId?CategoryId=${id}&UserId=${this.id}`);
  }
  getByBrand(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllByBrand?BrandId=${id}`);
  }
  Search(text: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}SearchByNameAndBrand?key=${text}&UserId=${this.id}`);
  }
}
