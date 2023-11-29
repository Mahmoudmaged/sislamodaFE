import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketManagementService {

  baseURL = `https://sislimoda.com/api/Ticket/`;
  token: any = localStorage.getItem("token");

  id!: string
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.token = localStorage.getItem("token")
    this.id = JSON.parse(localStorage.getItem('user')!)?.id;

  }

  getTickets(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetAll`);

  }

  getById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}GetById?UserId=${id}`);

  }

}
