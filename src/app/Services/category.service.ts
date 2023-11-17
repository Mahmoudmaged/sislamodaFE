import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL = `https://sislimoda.com/api/Category/`;
  // token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // this.token = localStorage.getItem("token")
  }


  categoryList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllMainCategory`);
  }

  Search(text: any): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllMainCategory`);
  }

  getListOfSubCategoriesById(id: any): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllSubById?catId=${id}`)
  }


  getCategoryWithId(id: any): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?catId=${id}`)
  }
  addCategory(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Add`, data);
  }

  updateCategory(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Update`, data);
  }
  deleteCategoryById(id: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}Delete?id=${id}`, {});
  }

}
