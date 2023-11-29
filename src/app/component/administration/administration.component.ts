import {
  Component, OnInit
} from '@angular/core';
import { FinancialManagementComponent } from '../financial-management/financial-management.component';
import { ActivatedRoute, Router } from '@angular/router';
declare let $: any
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  mainBar: any[] = [
    { item: 'listItem1', com: 'dashboard' },
    { item: 'listItem2', com: 'order' },
    { item: 'listItem3', com: 'product' },
    { item: 'listItem4', com: 'vendor' },
    { item: 'listItem5', com: 'inventory' },
    { item: 'listItem6', com: 'user' },
    { item: 'listItem7', com: 'financial' },
    { item: 'listItem8', com: 'content' },
    { item: 'listItem9', com: 'category' },
    { item: 'listItem10', com: 'sales' },
    { item: 'listItem11', com: 'settings' },
    { item: 'listItem12', com: 'offers' },
    { item: 'listItem13', com: 'brand' },
    { item: 'listItem15', com: 'ticket' },
    { item: 'listItem18', com: 'ticket' },
  ]
  itemBar: any = {}
  dir: string = ''
  sideMessage: string = ''
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  vendorData: any;
  lang: string = 'English'
  constructor(
    public _Router: Router, public _ActivatedRoute: ActivatedRoute) {
    console.log({ dir: localStorage.getItem('dir') });

    this.dir = localStorage.getItem('dir') || 'ltr';
    // this.dir = 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    console.log({userInfo:this.userInfo});
    
    if (this.userInfo?.isVendor) {

      this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
      console.log({vv:this.vendorData});

    }

    this.photo = this.userInfo?.photo || this.photo;

  }

  ngOnInit(): void {
    this.itemBar = this.mainBar.find(ele => ele.com == `${this._ActivatedRoute.firstChild?.snapshot?.url[0]?.path}`)
    this.changeDisplay(this.itemBar?.item || this.mainBar[0].item, this.itemBar?.com || this.mainBar[0].com)
    console.log({ itemBar: this.itemBar });
  }

  getNotification(){
    this._Router.navigateByUrl("/admin/notification")
  }

  changeDisplay(item: string, component: string): any {
    //hide all

    console.log({ item, component });

    $(`.listItem`).children("i").hide();
    $(`.listItem`).children("p").removeClass("ActiveCheck")
    $(`.listItem`).children('p').children(".image").show()
    $(`.listItem`).children("p").children(".image2").hide()

    //Display 
    $(`.${item}`).children("i").show()
    $(`.${item}`).children("p").addClass("ActiveCheck")
    $(`.${item}`).children('p').children(".image2").show()
    $(`.${item}`).children('p').children(".image").hide()


    this._Router.navigateByUrl(`/admin/${component}`) // thanks to lazyLoading with nesting routing
    window.scrollTo(0, 0)
  }

  changeComponent(sec: string) {

  }

  loadProfile(id: string) {
    if (this.userInfo?.isVendor) {
      this._Router.navigateByUrl(`/admin/vendor/profile/${id}/details`)
    }
  }

  logout() {
    localStorage.clear();
    if (this.userInfo?.isAdmin) {
      this._Router.navigateByUrl("/admin/login")
    } else {
      this._Router.navigateByUrl("/vendor/login")

    }
  }
  load: boolean = false
  changeLanguage() {
    this.load = true
    // this.dir = this.dir == 'rtl' ? 'ltr' : 'rtl'


    if (this.dir == 'rtl') {
      this.dir = 'ltr'
      this.lang = 'Arabic'
    } else {
      this.dir = 'rtl'
      this.lang = 'English'
    }
    localStorage.setItem('dir', `${this.dir}`);
    this.itemBar = this.mainBar.find(ele => ele.com == `${this._ActivatedRoute.firstChild?.snapshot?.url[0]?.path}`)
    // this.changeDisplay(this.itemBar?.item || this.mainBar[0].item, this.itemBar?.com || this.mainBar[0].com)
    this.load = false
    this.reloadComponent(true)
  }


  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this._Router.url);
    const url = self ? this._Router.url : urlToNavigateTo;
    this._Router.navigateByUrl(`/admin/${url}`, { skipLocationChange: true }).then(() => {
      this._Router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this._Router.url}`)
      })
    })
  }

}
