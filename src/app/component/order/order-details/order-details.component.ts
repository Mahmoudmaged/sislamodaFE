import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { OrderService } from 'src/app/Services/order.service';
declare let $: any;
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  load: boolean = false
  sideMessage: string = ''
  order: any;
  pages: number = 20;
  pageSize = 8
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  dir: string = 'ltr'
  optionSet: any = {};


  getOptionSetByNames() {
    this._OptionSetService.getOptionSetByNames(['orderStatus']).subscribe(res => {
      this.optionSet = res[0]
      // console.log({ res: this.optionSet });
    }, err => {
      this.showSideError('Fail')
    })
  }
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _OrderService: OrderService,
    public _ActivatedRoute: ActivatedRoute,
    private _OptionSetService: OptionSetService,) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getOrder(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }



  ngOnInit(): void {
    this.getOptionSetByNames()
  }

  getOrder(orderId: any) {
    this.load = true;
    return this._OrderService.getOrderById(orderId).subscribe(res => {
      this.load = false;

      // console.log({ res });
      this.order = res
    }, err => {
      this.load = false;

      // console.log({ err });
    }
    )
  }


  showDropDown(ind: number) {

    //remover from siblings
    $(`.dropdown-menu-list`).not(`.dropdown-menu-list${ind}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.search_dropdownMenuButton${ind}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.dropdown-menu-list${ind}`).slideToggle(300)
    $(`.search_dropdownMenuButton${ind}`).toggleClass('search_dropdownMenuButton_click')
  }

  showDropDownFilter(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }
  changeOrderStatusFilter(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "processing":
        $(`.${btn}`).css({ 'background-color': '#ffedc3' })
        break;
      case "chipped":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "delivered":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
        break;
      case "Order Status":
        $(`.${btn}`).css({ 'background-color': '#ffff' })
        break;
      default:
        break;
    }
  }


  changeOrderStatus(orderId: string, btnIndicator: number, color: string, statusId: string, value: any, nameEn: string, nameAr: string) {
    this.load = true;
    let status = nameEn;
    if (this.dir == 'rtl') {
      status = nameAr
    }
    // console.log({ color });

    $(`.search_dropdownMenuButton${btnIndicator}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
    $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': color })


    const data = {
      Id: orderId,
      Value: value,
      Name: this.optionSet.name
    }
    // console.log({ data });
    this._OrderService.updateOrderStatus(data).subscribe(res => {
      this.load = false
      this.showSideError("Done")

    }, err => {
      this.load = false
      // console.log({ err });
      this.showSideError("fail")
    })


  }


  changeVendorStatusGraph(x: any, y: any) {

  }

  displayOrderDetails(id: string) {
    // $(".orderTable").hide(200)
    // $(".OrderDetailsSec").show(300)
    this._Router.navigateByUrl(`admin/order/${id}/details`)
  }

  closeOrderDetailsSec() {
    // $(".OrderDetailsSec").hide(200)
    // $(".orderTable").show(300)
    this._Router.navigateByUrl(`admin/order`)

  }
}
