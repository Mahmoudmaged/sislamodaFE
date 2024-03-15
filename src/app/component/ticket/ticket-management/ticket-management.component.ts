import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/Services/offer.service';
import { TicketManagementService } from 'src/app/Services/ticket-management.service';
declare let $: any;
@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {
  ticketList: any[] = []
  fullTicketList: any[] = []
  userInfo: any;
  vendorData: any;
  pages: number = 10;
  pageSize = 6;
  currentPage = 1
  textSearch: string = ''
  load: boolean = false;
  sideMessage: String = '';
  photo: string = `../../../assets/images/avatar/ava.png`
  dir: string = 'ltr'
  constructor(private _Router: Router,
    private _OfferService: OfferService,
    private _TicketManagementService: TicketManagementService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getTicketList()

  }
  ngOnInit(): void {

  }
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }



  onSearch() {
    if (this.textSearch) {
      this.fullTicketList = this.fullTicketList.filter(ele => {
        return ele.titleEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullTicketList.length / this.pageSize);//(`${res.length / this.pageSize}`);
      this.ticketList = this.fullTicketList.slice(0, this.pageSize);

    } else {
      this.getTicketList()
    }

  }




  getTicketList() {
    this.load = true

    if (this.userInfo.isVendor) {
      this._TicketManagementService.getVendorTickets(this.vendorData?.id).subscribe(res => {
        this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);
        this.fullTicketList = res;
        this.ticketList = this.fullTicketList.slice(0, this.pageSize);
        this.load = false
      }, err => {
        this.load = false
        this.showSideError('Fail')
      }
      )
    } else {
      this._TicketManagementService.getTickets().subscribe(res => {
        this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);
        this.fullTicketList = res;
        this.ticketList = this.fullTicketList.slice(0, this.pageSize);
        this.load = false
      }, err => {
        this.load = false
        this.showSideError('Fail')
      }
      )
    }



  }




  getPageContent(page: number) {
    if (page <= 0) {
      page = 1
    }
    if (page >= this.pages) {
      page = this.pages
    }

    if (this.currentPage == page) {
      return;
    }

    // console.log({ page });
    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.ticketList = this.fullTicketList.slice(skip, skip + this.pageSize);

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }

  add() {
    this._Router.navigateByUrl(`admin/ticket/add`)
  }

  details(id: string) {
    this._Router.navigateByUrl(`/admin/ticket/${id}/details`)

  }
  edit(id: string) {
    this._Router.navigateByUrl(`/admin/ticket/${id}/edit`)
  }
  delete(id: string) {
    this.load = true;
    this._OfferService.deleteOfferById(id).subscribe(res => {
      this.getTicketList()
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError('Fail to delete please try again')
    })
  }

  deleteItemId: string = ''
  deletePromote(id: string) {
    $(".deleteLayer").show()
    this.deleteItemId = id
  }

  closeDeleteAlert() {
    $(".deleteLayer").hide()
  }

  confirmDelete() {
    this.closeDeleteAlert()
    if (this.deleteItemId) {
      this.delete(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }

}