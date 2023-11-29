import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables, Colors } from 'chart.js'
import { OptionSetService } from 'src/app/Services/optionset.service';
import { VendorService } from 'src/app/Services/vendor.service';
// import  {ApexChart} from 'ngx-apexcharts'

declare let $: any;
@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {
  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  vendorList: any[] = []
  fullVendorList: any[] = [];
  pages: number = 10;
  pageSize = 6;
  currentPage = 1
  load: boolean = false;
  sideMessage: string = '';
  dir: string = 'ltr'
  optionSet:any;
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  getOptionSetByNames() {
    this._OptionSetService.getOptionSetByNames(['vendorstatus']).subscribe(res => {
      this.optionSet = res[0]

    }, err => {
      this.showSideError('Fail')
    })
  }


  changeOrderStatusFilter(btn: string, color: string, nameEn: string, nameAr: string) {
    let status = nameEn;
    if (this.dir == 'rtl') {
      status = nameAr
    }
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
    $(`.${btn}`).css({ 'background-color': color })


    if (status == 'Vendor Status' || status == 'التصنيف') {
      this.currentPage = 1;
      this.pages = Math.ceil(this.fullVendorList.length / this.pageSize);
      this.vendorList = this.fullVendorList.slice(0, this.pageSize);
      return this.vendorList
    } else {
      this.vendorList = this.fullVendorList.filter(ele => {
        return ele.vendorStatus?.nameAr?.toLowerCase() == status || ele.vendorStatus?.nameEn.toLowerCase() == status.toLowerCase()
      })
      return this.vendorList
    }




  }


  changeOrderStatus(vendorId: string, btnIndicator: number, color: string, statusId: string, value: any, nameEn: string, nameAr: string) {
    this.load = true;
    let status = nameEn;
    if (this.dir == 'rtl') {
      status = nameAr
    }
    console.log({ color });

    $(`.search_dropdownMenuButton${btnIndicator}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
    $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': color })


    const data = {
      Id: vendorId,
      Value: value,
      Name: this.optionSet.name
    }
    console.log({ data });
    this._vendorService.updateVendorStatus(data).subscribe(res => {
      this.load = false
      this.showSideError("Done")
      
    }, err => {
      this.load = false
      console.log({ err });
      this.showSideError("fail")
    })


  }

  
  showDropDownFilter(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }

  constructor(private _Router: Router, private _vendorService: VendorService , private _OptionSetService:OptionSetService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.getVendorList()
  }

  ngOnInit(): void {
    this.getOptionSetByNames()

  }


  showDropDown(classSelector: number) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.dropdown-menu-list${classSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.search_dropdownMenuButton${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.dropdown-menu-list${classSelector}`).slideToggle(300)
    $(`.search_dropdownMenuButton${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }


 

  changeVendorStatus(btn: number, status: string) {
    $(`.search_dropdownMenuButton${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    switch (status) {
      case "declined":
        $(`.search_dropdownMenuButton${btn}`).css({ 'background-color': '#D80008' })
        break;
      case "suspended":
        $(`.search_dropdownMenuButton${btn}`).css({ 'background-color': '#ffdcdc' })
        break;
      case "continue":
        $(`.search_dropdownMenuButton${btn}`).css({ 'background-color': '#81ffca' })
        break;
      default:
        break;
    }
  }




  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }


  displayVendorProf(id: string) {
    this._Router.navigateByUrl(`/admin/vendor/${id}/profile`)
  }

  getVendorList() {
    this.load = true
    return this._vendorService.getAllVendor().subscribe(res => {

      this.pages = Math.ceil(res.length / this.pageSize);//(`${res.length / this.pageSize}`);

      this.fullVendorList = res;
      this.vendorList = this.fullVendorList.slice(0, this.pageSize);
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError('Fail')
    })
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
    this.vendorList = this.fullVendorList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullVendorList = this.fullVendorList.filter(ele => {
        return ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullVendorList.length / this.pageSize);
      this.vendorList = this.fullVendorList.slice(0, this.pageSize);

    } else {
      this.getVendorList()
    }

  }



  deleteVendor(id: string) {
    this.load = true;
    this._vendorService.deleteVendorById(id).subscribe(res => {
      this.load = false;
      this.currentPage = 1;
      this.showSideError(`Done`);

      return this.getVendorList()
    }, err => {
      this.load = false;
      this.showSideError(`Fail to delete this vendor.`);
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
      this.deleteVendor(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }
}
