import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {
  baseURL = `https://sislimoda.com/api/Attachment/`;
  token: any = `Hamada__` + localStorage.getItem("token");
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = `Hamada__` + localStorage.getItem("token")
  }


  uploadAttachBase64(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}upload`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
