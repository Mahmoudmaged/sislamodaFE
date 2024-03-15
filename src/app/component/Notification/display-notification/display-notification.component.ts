import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
declare let $: any;
@Component({
  selector: 'app-display-notification',
  templateUrl: './display-notification.component.html',
  styleUrls: ['./display-notification.component.scss']
})
export class DisplayNotificationComponent implements OnInit {
  load: boolean = false
  sideMessage: string = ''
  
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  dir: string = 'ltr'
  optionSet: any = {};
  notification: any;



  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _NotificationService: NotificationService,
    public _ActivatedRoute: ActivatedRoute,) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getNotification(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }


  ngOnInit(): void {
  }

  getNotification(id: any) {
    this.load = true;
    return this._NotificationService.getById(id).subscribe(res => {
      // console.log({ res });
      this.notification = res
      this.load = false;
    }, err => {
      this.load = false;
      // console.log({ err });
      this.showSideError("Fail")
    }
    )
  }

  closeOrderDetailsSec() {
    this._Router.navigateByUrl(`admin/notification`)

  }
}
