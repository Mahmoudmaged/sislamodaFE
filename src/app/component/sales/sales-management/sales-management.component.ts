import { Component  , OnInit} from '@angular/core';
declare let $:any
@Component({
  selector: 'app-sales-management',
  templateUrl: './sales-management.component.html',
  styleUrls: ['./sales-management.component.scss']
})
export class SalesManagementComponent implements OnInit {
  orderList: any = []
  pages: number = 10;
  pageSize = 8
  currentPage = 1

  load: boolean = false;
  sideMessage: string = '';

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor() {


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

    switch (status) {
      case "declined":
        $(`.${btn}`).css({ 'background-color': '#D80008' })
        break;
      case "suspended":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "continue":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
        break;
      default:
        break;
    }
  }

  changeVendorStatus(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "declined":
        $(`.${btn}`).css({ 'background-color': '#D80008' })
        break;
      case "suspended":
        $(`.${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "continue":
        $(`.${btn}`).css({ 'background-color': '#81ffca' })
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

    // console.log({ page });
    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }

  displayUserInquiries() {

  }

  closeVendorProf() {
    $(".VendorProfSec").css({ "visibility": "hidden" })
    $(".VendorTable").show(300)
  }

  deleteById(id:string){

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
      this.deleteById(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }
}
