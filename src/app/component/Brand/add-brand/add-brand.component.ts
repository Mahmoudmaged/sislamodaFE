import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

declare let $: any;
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []
  optionList: any = []
  brandList: any = []
  image: any = false;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  selectedImages: any[] = []
  imagesList: any = []
  vendorData: any;
  dir: string = 'ltr'
  base: any;
  startShowError: boolean = false;
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _AttachmentsService: AttachmentsService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

  }





  selectImage(event: any) {


    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;

      this.base = this.selectedImage
      // console.log({ fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1] });

      return this._AttachmentsService.uploadAttachBase64({
        fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
      }).subscribe(res => {
        this.image = res
        // console.log({ res });
      }, err => {
        // console.log({ err });
      }
      )

    };
    reader.readAsDataURL(file);

  }

  removeImage() {
    this.selectedImage = ''
    this.image = false;
    this.addBrandForm.controls.image.setValue('')
  }



  addBrandForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
  })





  handelAddBrand() {
    this.load = true;

    if (this.addBrandForm.invalid) {
      this.startShowError = true;
      this.load = false;
      return;

    }
    if (!this.image) {
      return this.showSideError(`Please upload  product images`)
    }



    let data = {
      name: this.addBrandForm.controls.name.value,
      nameEn: this.addBrandForm.controls.nameEn.value,
      description: this.addBrandForm.controls.description.value,
      descriptionEn: this.addBrandForm.controls.descriptionEn.value,
      brandPhotoId: this.image,
      order: 0
    }


    return this._BrandService.addBrand(data).subscribe(res => {
      this.load = false;
      this._Router.navigateByUrl("/admin/brand")
    },
      err => {
        // console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }



  ngOnInit(): void {

  }

  cancel() {
    this._Router.navigateByUrl('/admin/brand')
  }
}
