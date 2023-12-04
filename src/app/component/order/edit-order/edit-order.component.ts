import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  load: boolean = false;
  sideMessage: string = '';
  product: any;
  selectedValues: string[] = [];
  categoryList: any = []
  subcategoryList: any = []
  brandList: any = []
  images: any = [];
  optionList: any = []
  errorMessage: string = ''
  vendorData: any;
  userInfo: any;
  optionSet: any = {};
  dir: string = 'ltr'
  optionSetList: any = []
  selectedOption: string = '';
  selectedOPtionFilter: string = 'nameEn'
  order: any;
  statusData: any;


  getOptionSetByNames() {
    this._OptionSetService.getOptionSetByNames(['orderStatus']).subscribe(res => {
      this.optionSet = res[0];
    }, err => {
      this.showSideError('Fail')
    })
  }
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }


  showDropDown() {
    //Display target dropdown
    $(`.dropdown-menu-list`).slideToggle(300)
    $(`.search_dropdownMenuButton`).toggleClass('search_dropdownMenuButton_click')
  }


  changeOrderStatus(orderId: string, btnIndicator: number, color: string, statusId: string, value: any, nameEn: string, nameAr: string) {
    // this.load = true;
    let status = nameEn;
    if (this.dir == 'rtl') {
      status = nameAr
    }
    console.log({ color });

    $(`.search_dropdownMenuButton`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
    $(`.search_dropdownMenuButton`).css({ 'background-color': color })


    this.statusData = {
      Id: orderId,
      Value: value,
      Name: this.optionSet.name
    }



  }
  constructor(private _Router: Router,
    private _AttachmentsService: AttachmentsService,
    private _ActivatedRoute: ActivatedRoute,
    private _OptionSetService: OptionSetService,
    private _OrderService: OrderService) {

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

    this.getOrderByID(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }



  selectedImage: string = '';
  imagesList: any = []

  selectImage(event: any) {


    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        console.log({ im: this.selectedImage });

        return this._AttachmentsService.uploadAttachBase64({ fileName: event.target.files[i].name, file: this.selectedImage.split("base64,")[1] }).subscribe(res => {
          this.imagesList.push({

            photoId: res
          })
          console.log({ res });
        }, err => {
          console.log({ err });
        }
        )

      };
      reader.readAsDataURL(file);
    }





  }



  editOrderForm = new FormGroup({
    orderDetails: new FormControl('', [Validators.required]),
    shippingAddress: new FormControl('', [Validators.required])
  })

  getOrderByID(id: any) {
    this.load = true
    this._OrderService.getOrderById(id).subscribe(res => {
      this.order = res;
      this.editOrderForm.controls.orderDetails.setValue(this.order.addressDetails);
      this.editOrderForm.controls.shippingAddress.setValue(this.order.address);
      this.load = false
    }, err => {
      this.load = false;
      this.showSideError(`Fail`)

    })
  }


  handelEditOrder() {
    this.load = true;
    this.order.addressDetails = this.editOrderForm.controls.orderDetails.value;
    this.order.address = this.editOrderForm.controls.shippingAddress.value;
    this._OrderService.updateOrder(this.order).subscribe(res => {

      if (this.statusData) {
        console.log({ statusData: this.statusData });
        this._OrderService.updateOrderStatus(this.statusData).subscribe(res => {
          this.load = false
          // this.showSideError("Done")
          this._Router.navigateByUrl(`/admin/order/${this.order.id}/details`)
        }, err => {
          this.load = false
          console.log({ err });
          this.showSideError("fail")
        })
      } else {
        this.load = false;
        this._Router.navigateByUrl(`/admin/order/${this.order.id}/details`)

      }
    }, err => {
      console.log({ err });
      this.showSideError("fail in  update order")
    })

  }


  ngOnInit(): void {
    this.getOptionSetByNames()
  }



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/order`)
  }
}
