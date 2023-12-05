import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  product: any;
  pages: number = 20;
  pageSize = 8
  currentPage = 1
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  dir: string = 'ltr'
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(private _Router: Router,
    private _ProductService: ProductService,
    public _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir')! || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);

    this.photo = this.userInfo?.photo || this.photo;
    this.getProduct(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }



  ngOnInit(): void {
  }

  getProduct(orderId: any) {
    this.load = true;
    return this._ProductService.getProductById(orderId).subscribe(res => {
      this.product = res;
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError(`In-valid product Id`);
    }
    )
  }


  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)

  }


  productDetailsArray: any[] = [];
  addFlag: boolean = false;




  showAddProductDetails() {
    $(".productDetails_layer").show()
  }
  closeAddSection() {
    this.addFlag = false
    $(".productDetails_layer").hide()
  }

  deleteItemId: string='';
  deletePromote(id: string) {
    $(".deleteLayer").show()
    this.deleteItemId = id;
  }

  closeDeleteAlert() {
    $(".deleteLayer").hide()
  }

  confirmDelete() {
    this.closeDeleteAlert()
    this.load = true

    this._ProductService.deleteProductDetail(this.deleteItemId).subscribe(res => {
      this.load = false
    }, err => {
      console.log({ er: err });

      this.showSideError(`Fail`)
      this.load = false
    })
  }


  AddProductDetail() {
    this._Router.navigateByUrl(`/admin/product/${this.product.id}/update`)
  }



}
