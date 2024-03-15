import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/Services/offer.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  offer: any;
  pages: number = 20;
  pageSize = 8
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  dir: string = 'ltr'
  optionList: any = []
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(
    private formBuilder: FormBuilder,
    private _Router: Router,
    private _ProductService: ProductService,
    private _OfferService: OfferService,
    public _ActivatedRoute: ActivatedRoute) {

    this.dir = localStorage.getItem('dir') || 'ltr';

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getOffer(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }


  productOptions: any = []
  selectedOp: any = []
  addOption(id: any) {

    if (!this.selectedOp.includes(id)) {
      this.selectedOp.push(id)
    } else {
      this.selectedOp = this.selectedOp.filter((ele: any) => {
        return ele != id;
      })

    }
  }
  removeSelectedProductsFromOptionList(offersProducts: any, res: any) {
    for (let i = 0; i < offersProducts.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (res[j].id == offersProducts[i].productId) {
          res.splice(j, 1)
        }
      }

    }

    this.optionList = res;
    this.addProductForm.controls['productOptions'].setValue([])

  

  }

  getAllProduct() {

    if (this.userInfo.isAdmin) {

      return this._ProductService.getProductsList().subscribe(res => {

        this.removeSelectedProductsFromOptionList(this.offer?.offersProducts, res)

      }, err => {
        // console.log({ err });
        this.showSideError('Fail to load product options');

      })
    } else {
      return this._ProductService.getProductsListByVendor(this.offer.vendorId).subscribe(res => {

        this.removeSelectedProductsFromOptionList(this.offer?.offersProducts, res)


      }, err => {
        // console.log({ err });
        this.showSideError('Fail to load product options');

      })
    }

  }

  form!: FormGroup;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      selectedItems: new FormControl([]) // Initialize the form control with an empty array
    });


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


  getOffer(id: string) {
    this.load = true;
    return this._OfferService.getOfferById(id).subscribe(res => {
      this.offer = res;
      this.getAllProduct()
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError(`In-valid offer Id`);
    }
    )
  }


  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/offers`)

  }
  showProduct(id: string) {
    this._Router.navigateByUrl(`admin/product/${id}/details`)

  }

  deleteProductFromOffer(id: string) {

    this.load = true;
    this._OfferService.deleteProductFromOfferById(id).subscribe(res => {

      this.load = false;
      this.getOffer(this.offer.id)
    }, err => {
      // console.log(err);

      this.load = false;

      this.showSideError(`Fail`)
    })
  }

  addProductForm = new FormGroup({
    productOptions: new FormControl([]),
  })
  // addProducts() {
  //   let selectedOptions: any[] = []
  //   if (this.addProductForm.controls.productOptions.value) {
  //     let selectOptions = this.addProductForm.controls.productOptions.value
  //     this.addProductForm.controls.productOptions.setValue([])
  //     for (let i = 0; i < selectOptions.length; i++) {
  //       selectedOptions.push(selectOptions[i])
  //     }

  //     selectedOptions = selectedOptions.map(ele => {
  //       return ele.id;
  //     })

  //     for (const product of selectedOptions) {
  //       this._OfferService.addProductToOffer({
  //         offersId: this._ActivatedRoute.snapshot.paramMap.get('id'),
  //         productId: product,
  //       }).subscribe(res => {
  //         this.addProductForm.controls['productOptions'].setValue([])
  //         this.getOffer(this.offer.id)
  //       }, err => {
  //         this.showSideError("Fail")
  //       })
  //     }

  //   } else {
  //     this.showSideError("please select products first")
  //   }

  // }

  addProducts() {

    if (this.selectedOp.length) {

      for (const product of this.selectedOp) {
        this._OfferService.addProductToOffer({
          offersId: this._ActivatedRoute.snapshot.paramMap.get('id'),
          productId: product,
        }).subscribe(res => {
          this.getOffer(this.offer.id)
        }, err => {
          this.showSideError("Fail")
        })
      }
      this.selectedOp = []

    } else {
      this.showSideError("please select products first")
    }

  }


}
