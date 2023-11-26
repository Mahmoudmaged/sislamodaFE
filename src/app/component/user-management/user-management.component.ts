import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
declare let $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  dummyImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  userList: any[] = []
  fullUserList: any[] = []
  pages: number = 10;
  pageSize = 8
  currentPage = 1
  sideMessage: string = '';
  load: boolean = false
  dir: string = 'ltr'

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(private _UserService: UserService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.getAllUsers()
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


  getAllUsers() {
    this.load = true;
    return this._UserService.allUsers().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);
      this.fullUserList = res;
      this.userList = this.fullUserList.slice(0, this.pageSize);
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError(`Fail to load product list.`);
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

    console.log({ page });
    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.userList = this.fullUserList.slice(skip, skip + this.pageSize);

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


  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullUserList = this.fullUserList.filter(ele => {
        return ele.name.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullUserList.length / this.pageSize);
      this.userList = this.fullUserList.slice(0, this.pageSize);

    } else {
      this.getAllUsers()
    }

  }


  deleteUserById(id: string) {
    this.load = true
    this._UserService.deleteUser(id).subscribe(res => {
      this.load = false
      this.showSideError("Done")
      this.getAllUsers()
    }, err => {
      this.load = false;
      this.showSideError(`Fail`)
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
      this.deleteUserById(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }
}
