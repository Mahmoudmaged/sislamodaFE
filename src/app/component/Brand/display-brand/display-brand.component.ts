import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
declare let $: any;
@Component({
  selector: 'app-display-brand',
  templateUrl: './display-brand.component.html',
  styleUrls: ['./display-brand.component.scss']
})
export class DisplayBrandComponent {

  load: boolean = false
  sideMessage: string = ''
  brand: any;
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
  constructor(private _Router: Router, private _BrandService: BrandService, public _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.photo = this.userInfo?.photo || this.photo;
    this.getBrandById(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }


  getBrandById(id: string) {
    this.load = true;
    this._BrandService.getById(id).subscribe(res => {
      this.brand = res
      this.load = false;
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )


  }
  ngOnInit(): void {
  }


  close() {
    this._Router.navigateByUrl("/admin/brand")
  }
}
