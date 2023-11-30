import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-settings-management',
  templateUrl: './settings-management.component.html',
  styleUrls: ['./settings-management.component.scss']
})
export class SettingsManagementComponent implements OnInit {
  dir: string = 'ltr';
  textSearch: string = ''

  settingsList = [
    { nameEn: 'Notifications', nameAr: 'الاشعارات', img: '../../../assets/images/Sislimoda/notification.svg' , path:'/admin/notification' },
    { nameEn: 'Payment methods', nameAr: 'طرق الدفع', img: '../../../assets/images/Sislimoda/white/support-ticket.svg' ,path:'/admin/payment' },
    { nameEn: 'Option-Set', nameAr: 'مجموعات الخيارات', img: '../../../assets/images/Sislimoda/notification.svg' , path:'/admin/optionSet' },
    { nameEn: 'Options', nameAr: 'خيارات', img: '../../../assets/images/Sislimoda/notification.svg' , path:'/admin/options' }
  ];
  displaySettingList: any[] = []
  constructor(private _Router: Router) {
    this.dir = localStorage.getItem('dir') || 'ltr'
    this.displaySettingList = this.settingsList
  }

  ngOnInit(): void {

  }


  showDropDown(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }


  changeOrderStatus(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    if (status == 'Notifications') {
      $(".Notifications").show()
      $(".PaymentGateways").hide()
    } else {
      $(".Notifications").hide()
      $(".PaymentGateways").show()
    }

  }

  navTo(path: string) {
    return this._Router.navigateByUrl(path)
  }


  onSearch() {
    if (this.textSearch) {

      this.displaySettingList = this.settingsList.filter(ele => {
        return ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase()) || ele.nameAr.toLowerCase().includes(this.textSearch.toLowerCase())
      });
    } else {
      this.displaySettingList = this.settingsList
    }
  }





}
