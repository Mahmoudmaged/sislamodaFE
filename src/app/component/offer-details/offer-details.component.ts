import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _OfferService: OfferService,
    public _ActivatedRoute: ActivatedRoute) {

    this.dir = localStorage.getItem('dir') || 'ltr';

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getOffer(this._ActivatedRoute.snapshot.paramMap.get('id')!)

    this.getAllProduct()
  }



  getAllProduct() {
    return this._ProductService.getProductsList().subscribe(res => {
      this.optionList = res;
    }, err => {
      console.log({ err });
      this.showSideError('Fail to load product options');

    })
  }
  ngOnInit(): void {
  }

  getOffer(id: string) {
    this.load = true;
    return this._OfferService.getOfferById(id).subscribe(res => {
      this.offer = res;
      console.log({off: this.offer });
      
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
      console.log(err);

      this.load = false;

      this.showSideError(`Fail`)
    })
  }

  addProductForm = new FormGroup({
    productOptions: new FormControl('', []),
  })
  addProducts() {
    let selectedOptions: any[] = []
    if (this.addProductForm.controls.productOptions.value) {
      let selectOptions = this.addProductForm.controls.productOptions.value
      for (let i = 0; i < selectOptions.length; i++) {
        selectedOptions.push(selectOptions[i])
      }

      selectedOptions = selectedOptions.map(ele => {
        return ele.id;
      })

      for (const product of selectedOptions) {

        this._OfferService.addProductToOffer({
          offersId: this._ActivatedRoute.snapshot.paramMap.get('id'),
          productId: product,
        }).subscribe(res => {
          this.getOffer(this.offer.id)
        }, err => {
          this.showSideError("Fail")
        })
      }

    } else {
      this.showSideError("please select products first")
    }

  }



}
