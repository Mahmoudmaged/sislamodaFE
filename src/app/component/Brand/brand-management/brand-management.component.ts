import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { VendorService } from 'src/app/Services/vendor.service';
declare let $: any;
@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss']
})
export class BrandManagementComponent implements OnInit{
  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  brandList: any[] = []
  fullBrandList: any[] = [];
  pages: number = 10;
  pageSize = 6;
  currentPage = 1
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

  constructor(private _Router: Router, private _vendorService: VendorService, private _BrandService: BrandService) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.getBrandList()
  }

  ngOnInit(): void {

  }


  showDropDown(classSelector: number) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.dropdown-menu-list${classSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.search_dropdownMenuButton${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.dropdown-menu-list${classSelector}`).slideToggle(300)
    $(`.search_dropdownMenuButton${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }


  changeOrderStatus(btn: number, status: string) {
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



  getBrandList() {
    this.load = true
    return this._BrandService.brandList().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);
      this.fullBrandList = res;
      this.brandList = this.fullBrandList.slice(0, this.pageSize);
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
    this.brandList = this.fullBrandList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullBrandList = this.fullBrandList.filter(ele => {
        return ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullBrandList.length / this.pageSize);
      this.brandList = this.fullBrandList.slice(0, this.pageSize);

    } else {
      this.getBrandList()
    }

  }



  deleteBrand(id: string) {
    this.load = true;
    this._BrandService.deleteBrandById(id).subscribe(res => {
      this.load = false;
      this.currentPage = 1;
      this.showSideError(`Done`);

      return this.getBrandList()
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
      this.deleteBrand(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }

  addBrand() {
    this._Router.navigateByUrl('/admin/brand/add')
  }
  updateBrandDetails(id: string) {
    this._Router.navigateByUrl(`/admin/brand/${id}/update`)

  }

  displayBrandProf(id: string) {
    this._Router.navigateByUrl(`/admin/brand/${id}/details`)
  }

}
