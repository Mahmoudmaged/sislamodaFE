import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseURL = `https://sislimoda.com/api/Chat/`;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
  }



  getAllChatList(page: number = 1, size: number = 1000): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllChatWithMessage?page=${page}&pageSize=${size}`);
  }

  messageFromUser(data: any): Observable<any> { // message from vendor or user to admin
    return this._HttpClient.post(`${this.baseURL}messageFromUser`, data);
  }

  messageToUser(data: any): Observable<any> {  // message from  admin to vendor or user 
    return this._HttpClient.post(`${this.baseURL}MessageToUser`, data);
  }

  getChatData(myAppUserId: string, page: number = 1, size: number = 1000): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAllByUserId?myAppUserId=${myAppUserId}&page=${page}&pageSize=${size}`);
  }


  
}
