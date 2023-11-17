import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseURL = `https://sislimoda.com/api/Brand/`;
  token: any = localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
  }


  brandList(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllBrand`);
  }

}
