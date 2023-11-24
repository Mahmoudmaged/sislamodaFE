import { Component, OnInit } from '@angular/core';
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
  dir:string='ltr'
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
  }



  ngOnInit(): void {
  }

  getOffer(id: string) {
    this.load = true;
    return this._OfferService.getOfferById(id).subscribe(res => {
      this.offer = res;
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
}
