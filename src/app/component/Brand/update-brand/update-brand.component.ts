import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

declare let $: any;
@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {
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
  brand: any;

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _BrandService: BrandService,
    private _AttachmentsService: AttachmentsService, private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.getBrandById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
  }





  selectImage(event: any) {


    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;

      this.base = this.selectedImage
      console.log({ fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1] });

      return this._AttachmentsService.uploadAttachBase64({
        fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
      }).subscribe(res => {
        this.image = res
        console.log({ res });
      }, err => {
        console.log({ err });
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

  getBrandById(id: string) {
    this.load = true;



    this._BrandService.getById(id).subscribe(res => {
      this.brand = res
      this.addBrandForm.controls.name.setValue(this.brand.name)
      this.addBrandForm.controls.nameEn.setValue(this.brand.nameEn)
      this.addBrandForm.controls.description.setValue(this.brand.description)
      this.addBrandForm.controls.descriptionEn.setValue(this.brand.descriptionEn)
      this.load = false;

    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )


  }


  addBrandForm = new FormGroup({
    image: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
  })





  handelAddBrand() {
    this.load = true;
    if (this.image) {
      this.showSideError(`Please upload  product images`)
    }



    let data = {
      id: this._ActivatedRoute.snapshot.paramMap.get('id'),
      name: this.addBrandForm.controls.name.value,
      nameEn: this.addBrandForm.controls.nameEn.value,
      description: this.addBrandForm.controls.description.value,
      descriptionEn: this.addBrandForm.controls.descriptionEn.value,
      brandPhotoId: this.image ? this.image : this.brand.brandPhotoId,
      order: 0
    }


    this._BrandService.updateBrand(data).subscribe(res => {
      this.load = false;
      this._Router.navigateByUrl("/admin/brand")
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

  cancel() {
    this._Router.navigateByUrl('/admin/brand')
  }
}
