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
  ]

  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  vendorData: any;
  constructor(
    public _Router: Router, public _ActivatedRoute: ActivatedRoute) {

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    if (this.userInfo?.isVendor) {

      this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
      console.log(this.vendorData);

    }

    this.photo = this.userInfo?.photo || this.photo;

  }

  ngOnInit(): void {
    const itemBar = this.mainBar.find(ele => ele.com == `${this._ActivatedRoute.firstChild?.snapshot?.url[0]?.path}`)
    this.changeDisplay(itemBar?.item || this.mainBar[0].item, itemBar?.com || this.mainBar[0].com)
    console.log({ itemBar });
  }

  changeDisplay(item: string, component: string): any {
    //hide all

    console.log({ item, component });

    $(`.listItem`).children("p").removeClass("ActiveCheck")
    $(`.listItem`).children("i").hide();
    //Display 
    $(`.${item}`).children("p").addClass("ActiveCheck")
    $(`.${item}`).children("i").show()

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
    if (this.userInfo?.isAdmin) {
      this._Router.navigateByUrl("/admin/login")
    } else {
      this._Router.navigateByUrl("/vendor/login")

    }
  }

}
