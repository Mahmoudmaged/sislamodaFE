import {
  Component, OnInit
} from '@angular/core';
import { FinancialManagementComponent } from '../financial/financial-management/financial-management.component';
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
    { item: 'listItem12', com: 'offer' },
    { item: 'listItem13', com: 'brand' },
    { item: 'listItem18', com: 'ticket' },
    { item: 'listItem19', com: 'notification' }
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

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    if (this.userInfo?.isVendor) {
      this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    }

    this.photo = this.userInfo?.photo || this.photo;

  }

  ngOnInit() {

    console.log(this._ActivatedRoute.firstChild?.snapshot?.url[0]?.path);
    console.log(this._ActivatedRoute.firstChild?.snapshot?.url);

    this.itemBar = this.mainBar.find(ele => ele.com == `${this._ActivatedRoute.firstChild?.snapshot?.url[0]?.path}`)
    console.log({ itemBar: this.itemBar });
    if (!this.itemBar) {
      return this.changeDisplay(this.mainBar[0].item,this.mainBar[0].com)

    }
    if (this._ActivatedRoute.firstChild) {
      if (this._ActivatedRoute.firstChild?.snapshot?.url.length == 1) {
        return this.changeDisplay(this.itemBar.item , this.itemBar.com )
      } else {
        let customPath = ``
        for (const pathItem of this._ActivatedRoute.firstChild.snapshot.url) {
          customPath += `/${pathItem.path}`
        }
        return this.changeDisplay(this.itemBar.item, customPath)
      }
    }


  }

  getNotification() {
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
    console.log(`.${item}`);

    setTimeout(() => {
      $(`.${item}`).children("i").show()
      $(`.${item}`).children("p").addClass("ActiveCheck")
      $(`.${item}`).children('p').children(".image2").show()
      $(`.${item}`).children('p').children(".image").hide()
    }, 200);

    let fullPath = `/admin/${component}`;
    fullPath = fullPath.replaceAll("//", "/")

    this._Router.navigateByUrl(fullPath) // thanks to lazyLoading with nesting routing
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
