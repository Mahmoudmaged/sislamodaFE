import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
declare let $: any;
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  fullOrderList: any[] = []
  orderList: any[] = []
  pages: number = 20;
  pageSize = 6;
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  load: boolean = false;
  sideMessage: string = '';
  dir: string = 'ltr'
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router, private _OrderService: OrderService) {

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getAllOrders(this.userInfo?.id)
  }



  ngOnInit(): void {

  }

  getAllOrders(userId: string) {
    this.load = true;
    return this._OrderService.getOrderList(userId).subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);
      this.fullOrderList = res;
      this.orderList = this.fullOrderList.slice(0, this.pageSize);
      this.orderList = res
      this.load = false;

    }, err => {
      this.load = false;
      this.showSideError(`Fail`)
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


  changeOrderStatus(btnIndicator: number, status: string) {
    $(`.search_dropdownMenuButton${btnIndicator}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "processing":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#ffedc3' })
        break;
      case "chipped":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "delivered":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#81ffca' })
        break;
      case "Order Status":
        $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': '#ffff' })
        break;
      default:
        break;
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

    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.orderList = this.fullOrderList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullOrderList = this.fullOrderList.filter(ele => {
        return ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullOrderList.length / this.pageSize);
      this.orderList = this.fullOrderList.slice(0, this.pageSize);

    } else {
      this.getAllOrders(this.userInfo?.id)
    }

  }
  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }


  changeVendorStatusGraph(x: any, y: any) {

  }

  displayOrderDetails(id: string) {
    $(".orderTable").hide(200)
    $(".OrderDetailsSec").show(300)
    this._Router.navigateByUrl(`admin/order/${id}/details`)
  }

  deleteItemId: string = ''
  deleteOrder(id: string) {
    $(".deleteLayer").show()
    this.deleteItemId = id
  }

  closeDeleteAlert() {
    $(".deleteLayer").hide()
  }

  confirmDelete() {
    this.closeDeleteAlert()
    if (this.deleteItemId) {
      this._OrderService.deleteOrderById(this.deleteItemId).subscribe(res => {
        this.showSideError(`Done`)
      }, err => {
        this.showSideError(`Fail`)
      })
    } else {
      this.showSideError(`Fail`)
    }
  }
  closeOrderDetailsSec() {
    $(".OrderDetailsSec").hide(200)
    $(".orderTable").show(300)
  }

}
