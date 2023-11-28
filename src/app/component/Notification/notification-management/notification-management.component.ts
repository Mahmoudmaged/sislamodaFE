import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { OfferService } from 'src/app/Services/offer.service';
declare let $: any;
@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.scss']
})
export class NotificationManagementComponent  implements OnInit {
  notificationList: any[] = []
  fullNotificationList: any[] = []
  userInfo: any;
  vendorData: any;
  pages: number = 10;
  pageSize = 6;
  currentPage = 1
  textSearch: string = ''
  load: boolean = false;
  sideMessage: String = '';
  photo: string = `../../../assets/images/avatar/ava.png`
  dir:string='ltr'

  constructor(private _Router: Router, private _OfferService: OfferService , private _NotificationService:NotificationService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    console.log(this.userInfo);
    this.photo = this.userInfo?.photo || this.photo;
    this.getNotifications()

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
      this.fullNotificationList = this.fullNotificationList.filter(ele => {
        return ele.titleEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });
      this.pages = Math.ceil(this.fullNotificationList.length / this.pageSize);//(`${res.length / this.pageSize}`);
      this.notificationList = this.fullNotificationList.slice(0, this.pageSize);

    } else {
      this.getNotifications()
    }
  }




  getNotifications() {
    this.load = true
      return this._NotificationService.allNotification().subscribe(res => {
        this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);
        this.fullNotificationList = res;
        this.notificationList = this.fullNotificationList.slice(0, this.pageSize);
        this.load = false
      }, err => {
        this.load = false
        this.showSideError('Fail')
      }
      )
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

    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.notificationList = this.fullNotificationList.slice(skip, skip + this.pageSize);

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }


  add() {
    this._Router.navigateByUrl(`admin/notification/add`)
  }

  details(id: string) {
    this._Router.navigateByUrl(`/admin/notification/${id}/display`)

  }
  edit(id: string) {
    this._Router.navigateByUrl(`/admin/notification/${id}/edit`)
  }
  delete(id: string) {
    this.load = true;
    this._NotificationService.deleteById(id).subscribe(res => {
      this.getNotifications()
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
