import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/Services/coupon.service';
import { OfferService } from 'src/app/Services/offer.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  dir: string = 'ltr';
  userInfo: any;
  vendorData: any;
  coupon:any;
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CouponService: CouponService,
    private _Router: Router) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.userInfo = JSON.parse(localStorage.getItem('user')!);

    this.getCouponById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
  }


  parseDateString(dateString: string): Date {
    const parts = dateString.split('-');
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JavaScript Date
    const day = parseInt(parts[0], 10);

    return new Date(year, month, day);
  }
  getCouponById(id: string) {

    this.load = true;

    this._CouponService.getCouponById(id).subscribe((res) => {
      this.coupon = res;
      this.load = false

    }, err => {
      this.load = false;
      console.log({ err });

      this.showSideError('Fail to get coupon data please try again')
    })



  }





  ngOnInit(): void {

  }




  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/coupon`)

  }









}
