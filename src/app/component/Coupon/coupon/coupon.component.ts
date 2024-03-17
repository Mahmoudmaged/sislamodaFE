import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/Services/coupon.service';
declare let $: any;
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent {


  couponList: any[] = []
  fullCouponList: any[] = []
  userInfo: any;
  vendorData: any;
  pages: number = 10;
  pageSize = 6;
  currentPage = 1
  textSearch: string = ''
  load: boolean = false;
  sideMessage: String = '';
  photo: string = `../../../assets/images/avatar/ava.png`
  dir: string = 'ltr'

  constructor(private _Router: Router,
    private _CouponService: CouponService) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    // console.log(this.userInfo);
    this.photo = this.userInfo?.photo || this.photo;
    this.getCouponList()

  }
  ngOnInit(): void {

  }
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }



  onSearch() {
    if (this.textSearch) {
      this.fullCouponList = this.fullCouponList.filter(ele => {
        return ele.code.includes(this.textSearch) || ele.description.toLowerCase().includes(this.textSearch.toLowerCase())   || ele.descriptionEn.toLowerCase().includes(this.textSearch.toLowerCase())  
      });

      this.pages = Math.ceil(this.fullCouponList.length / this.pageSize);//(`${res.length / this.pageSize}`);
      this.couponList = this.fullCouponList.slice(0, this.pageSize);

    } else {
      this.getCouponList()
    }

  }




  getCouponList() {
    this.load = true
    return this._CouponService.getAllCouponList().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);
      this.fullCouponList = res;
      this.couponList = this.fullCouponList.slice(0, this.pageSize);
      this.load = false
    }, err => {
      this.load = false
      this.showSideError('Fail')
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

    // console.log({ page });
    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.couponList = this.fullCouponList.slice(skip, skip + this.pageSize);

  }

  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }

  addCoupon() {
    this._Router.navigateByUrl(`admin/coupon/add`)
  }

  showCouponDetails(id: string) {
    this._Router.navigateByUrl(`/admin/coupon/${id}/details`)

  }
  editCoupon(id: string) {
    this._Router.navigateByUrl(`/admin/coupon/${id}/edit`)
  }
  deleteCoupon(id: string) {
    this.load = true;
    this._CouponService.deleteCoupon(id).subscribe(res => {
      this.currentPage = 1
      this.getCouponList()
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError('Fail to delete please try again')
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
      this.deleteCoupon(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }
}
