import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
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
  selectedImages: any[] = []
  selectedImage: string = '';
  imagesList: any = []


  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }


  selectImage(event: any) {

    this.selectedImages = []
    this.imagesList = []
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.selectedImages.push(e.target.result)
        return this._AttachmentsService.uploadAttachBase64({ fileName: event.target.files[i].name, file: this.selectedImage.split("base64,")[1] }).subscribe(res => {
          this.imagesList.push({
            photoId: res
          })
        }, err => {
          this.showSideError('Fail to upload please try again')
        }
        )

      };
      reader.readAsDataURL(file);
    }





  }

  removeImage(i: number) {
    this.selectedImages.splice(i, 1)
    this.imagesList.splice(i, 1);
    // this.addCategoryForm.controls.image.setValue('')
  }

  constructor(private _Router: Router,
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _AttachmentsService: AttachmentsService,
    private _ActivatedRoute: ActivatedRoute) {

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

    this.getAllCategory()
    this.getAllBrands()
    this.getAllOption()
    this.getProductByID(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    setTimeout(() => {
      this.addProductForm.controls.subcategory.setValue(this.product.categoryId)
    }, 1000);
  }




  getAllOption() {
    return this._ProductService.getOptionList().subscribe(res => {
      this.optionList = res;
      console.log({ op: this.optionList });

    }, err => {
      console.log({ err });
      this.showSideError('Fail to load product options');

    })
  }
  getAllCategory() {
    return this._CategoryService.categoryList().subscribe(res => {
      console.log({ res });
      this.categoryList = res;
    }, err => {
      this.showSideError('Fail to load product category list');


    }
    )
  }
  getAllBrands() {
    return this._BrandService.brandList().subscribe(res => {
      this.brandList = res;
    }, err => {
      this.showSideError('Fail to load brand category list');

    }
    )
  }


  getSubCategory(id: string) {
    return this._CategoryService.getListOfSubCategoriesById(id || this.addProductForm.controls.category.value).subscribe(res => {
      this.subcategoryList = res
    }, err => {
      this.showSideError('In-valid category Id');
    })
  }
  addProductForm = new FormGroup({
    image: new FormControl('', []),
    productName: new FormControl('', [Validators.required]),
    productNameEn: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productDescriptionEn: new FormControl('', [Validators.required]),

    defaultPrice: new FormControl('', [Validators.min(1), Validators.required]),
    oldPrice: new FormControl('', [Validators.min(1), Validators.required]),
    amount: new FormControl('', [Validators.min(1), Validators.required]),


    productOptions: new FormControl('', []),
    noteForReturn: new FormControl('', []),
    // InventoryName: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    subcategory: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    available: new FormControl('available', [Validators.required]),

  })

  getProductByID(id: any) {
    this.load = true
    return this._ProductService.getProductWithId(id).subscribe(res => {

      this.product = res
      this.getSubCategory(this.product.category?.mainCategoryId);

      this.addProductForm.controls.productName.setValue(this.product.name)
      this.addProductForm.controls.productNameEn.setValue(this.product.nameEn)
      this.addProductForm.controls.productDescription.setValue(this.product.description)
      this.addProductForm.controls.productDescriptionEn.setValue(this.product.descriptionEn)
      this.addProductForm.controls.defaultPrice.setValue(this.product.defaultPrice)
      this.addProductForm.controls.oldPrice.setValue(this.product.oldPrice)
      this.addProductForm.controls.amount.setValue(this.product.amount)
      this.addProductForm.controls.productOptions.setValue(this.product.productOptions)
      this.addProductForm.controls.noteForReturn.setValue(this.product.noteForReturn)
      this.addProductForm.controls.category.setValue(this.product.category.mainCategoryId)
      this.addProductForm.controls.subcategory.setValue(this.product.categoryId)
      this.addProductForm.controls.brand.setValue(this.product.brandId)
      this.addProductForm.controls.available.setValue(this.product.isActive ? 'available' : 'unavailable')
      this.addProductForm.controls.productOptions.setValue(this.product.productOptions)
      this.load = false
    }, err => {
      this.load = false
      this.showSideError(`Fail product doesn't exist`);
    }
    )
  }


  handelAddProduct() {
    this.load = true;
    if (!this.imagesList.length) {
      this.showSideError(`Image is required`);
    }


    let selectedOptions: any[] = []
    console.log(this.addProductForm.controls.productOptions.value);

    if (this.addProductForm.controls.productOptions.value) {
      let selectOptions = this.addProductForm.controls.productOptions.value
      for (let i = 0; i < selectOptions.length; i++) {
        selectedOptions.push({
          optionId: selectOptions[i],
          price: 0
        })

      }


      selectedOptions = selectedOptions.map(ele => {
        return {
          optionId: ele.optionId.id,
          price: 0
        }
      })

    }

    let data = {
      id: this.product.id,
      name: this.addProductForm.controls.productName.value,
      nameEn: this.addProductForm.controls.productNameEn.value,
      description: this.addProductForm.controls.productDescription.value,
      descriptionEn: this.addProductForm.controls.productDescriptionEn.value,

      defaultPrice: this.addProductForm.controls.defaultPrice.value,
      oldPrice: this.addProductForm.controls.oldPrice.value,
      orderNUmber: 0,

      htmlDescriptions: "string",
      htmlOther: "string",

      isActive: (this.addProductForm.controls.available.value == 'available' || this.addProductForm.controls.available.value == `true`) ? true : false,

      defaultPhotoId: this.imagesList.length ? this.imagesList[0].photoId : this.product.defaultPhotoId,
      categoryId: this.addProductForm.controls.subcategory.value,
      brandId: this.addProductForm.controls.brand.value,
      vendorId: this.vendorData.id, //this.userInfo.id,,
      paymentType: "string",
      noteForReturn: this.addProductForm.controls.noteForReturn.value || 'string',
      amount: this.addProductForm.controls.amount.value,
      productImages: this.imagesList.length ? this.imagesList : this.product.imagesList,
      productOptions: selectedOptions.length ? selectedOptions : [],
      productDetails: [],



    }
    this._ProductService.updateProduct(data).subscribe(res => {
      this.load = false
      this._Router.navigateByUrl("/admin/product")
    },
      err => {
        this.load = false;
        this.showSideError(`Fail to update your product`)
      }
    )
  }


  ngOnInit(): void {
  }



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)
  }
}
