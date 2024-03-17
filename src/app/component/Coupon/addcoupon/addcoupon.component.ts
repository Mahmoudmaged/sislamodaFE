import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CouponService } from 'src/app/Services/coupon.service';
declare let $: any;
@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.scss']
})
export class AddcouponComponent implements OnInit {
  selectedValues: string[] = [];
  offerList: any = []
  base: any;
  image: any;
  errorMessage: string = ''
  userInfo: any;
  vendorData: any;
  selectedImage: string = '';
  categoryList: any = [];
  load: boolean = false;
  sideMessage: string = '';
  dir: string = 'ltr';

  startShowError:boolean=false;

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }


  ngOnInit(): void {
    $(".fa-angle-down").on('click', function () {
      $(".dropDownBody").slideDown()
      $(".fa-angle-down").hide()
      $(".fa-angle-up").show()
    })

    $(".fa-angle-up").on('click', function () {
      $(".dropDownBody").slideUp()
      $(".fa-angle-down").show()
      $(".fa-angle-up").hide()
    })
  }
  constructor(
    private _CategoryService: CategoryService,
    private _AttachmentsService: AttachmentsService,
    private _CouponService: CouponService,
    private _Router: Router) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
  }


  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  contentTypeList = [
    {
      name: "Amount", value: 1
    },
    {
      name: "Percent", value: 2
    }
  ]

  changeCouponType() {


    if (this.addCouponForm.controls.couponType.value == 1) {
      $(`.percent`).hide()
      $(`.amount`).show()
    } else {
      $(`.amount`).hide()
      $(`.percent`).show()

    }

  }

  isForAllValue: boolean = true;
  customType: number = 0
  addCouponForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    couponType: new FormControl(1, [Validators.required]),

    percent: new FormControl(this.customType, [Validators.required]),
    amount: new FormControl(this.customType, [Validators.required]),
    mustExceed: new FormControl(this.customType, [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),

    isActive: new FormControl(false, [Validators.required]),
    isForAll: new FormControl(this.isForAllValue, [Validators.required])
  })
  parseDateString(dateString: string): Date {
    const parts = dateString.split('-');
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JavaScript Date
    const day = parseInt(parts[0], 10);

    return new Date(year, month, day);
  }
  handelDate() {
    this.minimumDate = new Date(String(this.addCouponForm.controls.startDate.value))
  }
  minimumDate = new Date();
  handelAddCoupon() {

    this.load = true;

    if (this.addCouponForm.invalid) {
      this.startShowError = true;
      this.load = false;
      return;
    }

    let data = this.addCouponForm.value

    if (!this.isForAllValue && !this.selectedOp.length) {
      this.load = false;
      this.showSideError('You have to add users for this coupon or make it available for all')
    } else {
      data.percent = (data.percent || 0) / 100;
      this._CouponService.addCoupon(data).subscribe((res) => {
        this.load = false
        this._Router.navigateByUrl("/admin/coupon")
      }, err => {
        this.load = false;
        console.log({ err });

        this.showSideError('Fail to add please try again')
      })
    }


  }




  close() {
    this._Router.navigateByUrl("/admin/coupon")
  }


  productOptions: any = []
  selectedOp: any = []
  optionList: any = []

  isForAll() {
    this.isForAllValue = !this.isForAllValue;
  }
  addOption(id: any) {

    if (!this.selectedOp.includes(id)) {
      this.selectedOp.push(id)
    } else {
      this.selectedOp = this.selectedOp.filter((ele: any) => {
        return ele != id;
      })

    }
  }
}
