import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketManagementService } from 'src/app/Services/ticket-management.service';
declare let $: any;
@Component({
  selector: 'app-display-ticket',
  templateUrl: './display-ticket.component.html',
  styleUrls: ['./display-ticket.component.scss']
})
export class DisplayTicketComponent implements OnInit {

  load: boolean = false
  sideMessage: string = ''
  ticket: any;
  pages: number = 20;
  pageSize = 8
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  dir: string = 'ltr'

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(private _Router: Router,
     private _TicketManagementService: TicketManagementService, public _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getTicket(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }


  getTicket(id: string) {
    this.load = true;
    this._TicketManagementService.getById(id).subscribe(res => {
      this.ticket = res
      this.load = false;
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )


  }
  ngOnInit(): void {
  }


  close() {
    this._Router.navigateByUrl("/admin/ticket")
  }
}
