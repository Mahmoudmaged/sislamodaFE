import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dir: string = 'ltr';
  userInfo: any;
  vendorData: any;
  photo: string = ''
  data: any;
  products: any[] = []
  responsiveOptions: any[] | undefined;

  constructor(public _Router: Router, private _OrderService: OrderService, private _VendorService: VendorService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    // this.dir = 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    console.log({ userInfo: this.userInfo });

    if (this.userInfo?.isVendor) {

      this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
      console.log({ vv: this.vendorData });

    }

    this.photo = this.userInfo?.photo || this.photo;
    this.getDashBoardAnalysis()
  }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    setTimeout(() => {
      this.getDashBoardAnalysis()
      return this.products = this.data?.topSellingProducts
    }, 1000);

  }

  navTo(link: string) {
    this._Router.navigateByUrl(link)
  }
  navToProduct(id: string) {
    this._Router.navigateByUrl(`/admin/product/${id}/details`)
  }

  getDashBoardAnalysis() {
    if (this.userInfo?.isVendor) {
      this._VendorService.dashboard(this.userInfo?.id).subscribe(res => {
        this.data = res
        this.products = this.data?.topSellingProducts
      }, err => {
        console.log({ err });

      })
    } else {
      this._OrderService.dashboard().subscribe(res => {
        this.data = res;
        this.products = this.data?.topSellingProducts
        console.log({ data: this.data });

      }, err => {
        console.log({ err });

      })
    }
  }
}
