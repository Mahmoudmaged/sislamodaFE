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
  errorMessage: string = ''
  vendorData: any;
  userInfo: any;
  selectedImages: any[] = []
  selectedImage: string = '';
  imagesList: any = []

  dir: string = 'ltr'


  optionList: any[] = [];
  optionsGroups: any[] = [];
  selectedOptions: any[] = [];
  displayOptionsName: string = 'ltr'

  combineImages: any = []
  //////////////////////////////////////////////////////////////////////////////
  productDetailsArray: any[] = [];
  addFlag: boolean = false;
  getAllOption() {
    if (this.dir == 'ltr') {
      this.displayOptionsName = 'nameEn'
    } else {
      this.displayOptionsName = 'name'

    }
    return this._ProductService.getOptionList().subscribe(res => {
      this.optionList = res;


      let color = [];
      let size = [];
      let price = [];
      let materials = [];
      let occasion = [];
      let lastArrival = [];
      for (let i = 0; i < this.optionList.length; i++) {

        switch (this.optionList[i].optionType) {
          case 1:
            color.push(this.optionList[i])
            break;
          case 2:
            size.push(this.optionList[i])
            break;
          case 3:
            price.push(this.optionList[i])
            break;
          case 4:
            materials.push(this.optionList[i])
            break;
          case 5:
            occasion.push(this.optionList[i])
            break;
          case 6:
            lastArrival.push(this.optionList[i])
            break;
          default:
            break;
        }

      }
      console.log({ res });
      console.log({ color, size, price });
      this.optionsGroups = [
        {
          groupName: 'color',
          data: color
        },
        {
          groupName: 'size',
          data: size
        },
        {
          groupName: 'price',
          data: price
        },
        {
          groupName: 'materials',
          data: materials
        },
        {
          groupName: 'occasion',
          data: occasion
        },
        {
          groupName: 'last arrival',
          data: lastArrival
        }
      ]


    }, err => {
      this.showSideError('Fail to load product options please try again.')
    }
    )
  }

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  selectImage(event: any) {
    const acceptTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const reader = new FileReader();



      reader.readAsDataURL(file);



      reader.onload = (e: any) => {

        if (!acceptTypes.includes(event.target.files[i].type)) {
          this.load = false;
          return this.showSideError(`In-valid file type ${event.target.files[i].type?.split("/")[1]}`);
        } else {
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
        }

      };
    }





  }
  defaultImageIndex: number = -1;
  defaultImageIndexOld: number = -1;
  saveAsDefaultOldImage(i: number) {
    $(`.fa-check , .fa-check-old`).hide()
    $(`.fa-check-old-${i}`).show()
    this.defaultImageIndex = -1;
    this.defaultImageIndexOld = i;
  }
  saveAsDefault(i: number) {
    $(`.fa-check  , .fa-check-old`).hide()
    $(`.fa-check-${i}`).show()
    this.defaultImageIndex = i;
    this.defaultImageIndexOld = -1;
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
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

    this.getAllCategory()
    this.getAllBrands()
    this.getAllOption()
    this.getProductByID(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    // this.combineImages = [...this.product.productImages]
    setTimeout(() => {
      this.addProductForm.controls.subcategory.setValue(this.product.categoryId)
    }, 1000);
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


  // p-highlight
  getProductByID(id: any) {
    this.load = true
    return this._ProductService.getProductWithId(id).subscribe(res => {

      this.product = res
      console.log({ op: this.product.productOptions });

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
      this.productDetailsArray = this.product.productDetails


      this.load = false;
    }, err => {
      this.load = false
      this.showSideError(`Fail product doesn't exist`);
    }
    )
  }


  handelAddProduct() {
    this.load = true;
    // if (!this.imagesList.length) {
    //   this.showSideError(`Image is required`);
    // }


    let selectedOptions: any[] = []
    console.log({ sop: this.addProductForm.controls.productOptions.value });

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


    console.log({ dd: this.imagesList, pI: this.product.productImages });


    console.log({ pp: this.productDetailsArray });

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

      defaultPhotoId:
        this.defaultImageIndex < 0 ?
          this.defaultImageIndexOld < 0 ? this.product.defaultPhotoId : this.product.productImages[this.defaultImageIndexOld].photoId
          :
          this.imagesList[this.defaultImageIndex].photoId,
      // defaultPhotoId: this.imagesList.length ? this.imagesList[this.defaultImageIndex >= 0 ? this.defaultImageIndex : 0].photoId : this.product.defaultPhotoId,
      categoryId: this.addProductForm.controls.subcategory.value,
      brandId: this.addProductForm.controls.brand.value,
      vendorId: this.vendorData.id, //this.userInfo.id,,
      paymentType: "string",
      noteForReturn: this.addProductForm.controls.noteForReturn.value || 'string',
      amount: this.addProductForm.controls.amount.value,
      productImages: this.product.productImages,
      // productImages: this.imagesList.length ? this.imagesList : this.product.imagesList,
      productOptions: selectedOptions.length ? selectedOptions : [],
      productDetails: this.productDetailsArray



    }
    for (let i = 0; i < this.imagesList.length; i++) {
      this._ProductService.addProductImage({ productId: this.product.id, photoId: this.imagesList[i].photoId }).subscribe(res => {
      },
        err => {
          this.load = false;
          this.showSideError(`Fail to add new  product image `)
        }
      )

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



    setTimeout(() => {
      this.addProductForm.controls.productOptions.setValue(this.product.productOptions)
    }, 0);

  }



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/product`)
  }

  //////////////////////////////////////////////////////////////////////////////
  // productDetailsArray: any[] = [];
  // addFlag: boolean = false;

  addProductDetailsForm = new FormGroup({
    key: new FormControl('', [Validators.required]),
    keyEn: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    valueEn: new FormControl('', [Validators.required]),
  })


  removeImageFromProduct(i: any) {

  }

  handelAddProductDetails(flag: boolean) {

    this.load = true;
    if (!flag) {
      //add
      this.productDetailsArray.push({
        productId: this.product.id,
        key: this.addProductDetailsForm.controls.key.value,
        keyEn: this.addProductDetailsForm.controls.keyEn.value,
        value: this.addProductDetailsForm.controls.value.value,
        valueEn: this.addProductDetailsForm.controls.valueEn.value,
        icon: ''
      })
      this._ProductService.addProductDetail({
        productId: this.product.id,
        key: this.addProductDetailsForm.controls.key.value,
        keyEn: this.addProductDetailsForm.controls.keyEn.value,
        value: this.addProductDetailsForm.controls.value.value,
        valueEn: this.addProductDetailsForm.controls.valueEn.value,
        icon: ''
      }).subscribe(res => {
        this.addProductDetailsForm.reset();
        this.load = false
      }, err => {
        this.showSideError(`Fail`)
        this.load = false
      })
      this.addProductDetailsForm.reset();
      this.load = false
    } else {
      //update

      const index = $("#detailsID").val();
      this.productDetailsArray[index].key = this.addProductDetailsForm.controls.key.value;
      this.productDetailsArray[index].keyEn = this.addProductDetailsForm.controls.keyEn.value;
      this.productDetailsArray[index].value = this.addProductDetailsForm.controls.value.value;
      this.productDetailsArray[index].valueEn = this.addProductDetailsForm.controls.valueEn.value;
      this._ProductService.updateProductDetail(this.productDetailsArray[index]).subscribe(res => {
        this.addProductDetailsForm.reset();
        this.addFlag = false
        this.load = false
      }, err => {
        // this.addProductDetailsForm.reset();
        // this.addFlag = false

        this.showSideError(`Fail`)
        this.load = false
      })

    }

  }

  showAddProductDetails() {
    this.addProductDetailsForm.reset();

    $(".productDetails_layer").show()
  }
  closeAddSection() {
    this.addFlag = false
    $(".productDetails_layer").hide()
  }
  updateProductDetails(index: number) {
    if (this.productDetailsArray[index]) {
      this.addFlag = true
      $("#detailsID").val(index);
      this.addProductDetailsForm.controls.key.setValue(this.productDetailsArray[index].key);
      this.addProductDetailsForm.controls.keyEn.setValue(this.productDetailsArray[index].keyEn);
      this.addProductDetailsForm.controls.value.setValue(this.productDetailsArray[index].value);
      this.addProductDetailsForm.controls.valueEn.setValue(this.productDetailsArray[index].valueEn);
    } else {
      this.showSideError(`Fail`)
    }
  }

  deleteImage: any;
  deleteImageKey: any = { EN: 'Are you sure that you want to delete this product Image ?', AR: " برجاء التأكد من حذف ؟" }
  showDeleteImage: boolean = true;
  deleteImagePromote(id: number, image: any) {
    console.log({ id, image });

    //check if  it was a default image 
    if (image.photo?.fullLink == this.product.defaultPhoto?.fullLink && (this.defaultImageIndex < 0 || this.defaultImageIndexOld < 0)) {
      this.showDeleteImage = false;
      this.deleteImageKey = { EN: `Sorry can't delete the default image please mark other one as default before delete it`, AR: 'عفو لا يمكن حذف الصوره الرئسيه بدون تحديد اخري!' }
    } else {
      this.showDeleteImage = true;
      this.deleteImageKey = { EN: 'Are you sure that you want to delete this product Image ?', AR: " برجاء التأكد من حذف ؟" }
    }
    //--> if yes stop 
    //--> if their is new  image marked as default then ok
    //remove from product image list

    $(".deleteLayerImage").show()
    this.deleteImage = { index: id, image };
  }

  confirmDeleteImage() {
    this.closeDeleteAlert()
    this.load = true

    this._ProductService.deleteProductImage(this.deleteImage?.image?.id).subscribe(res => {
      this.product.productImages.splice(this.deleteImage?.index, 1)
      this.load = false
    }, err => {
      console.log({ er: err });

      this.showSideError(`Fail`)
      this.load = false
    })
  }


  deleteItemId: any;
  deletePromote(id: number) {
    $(".deleteLayer").show()
    this.deleteItemId = id;
  }

  closeDeleteAlert() {
    $(".deleteLayer , .deleteLayerImage").hide()
  }

  confirmDelete() {
    this.closeDeleteAlert()
    this.load = true
    console.log({ iddd: this.productDetailsArray[this.deleteItemId]?.id });

    this._ProductService.deleteProductDetail(this.productDetailsArray[this.deleteItemId]?.id).subscribe(res => {
      this.productDetailsArray.splice(this.deleteItemId, 1)
      this.load = false
    }, err => {
      console.log({ er: err });

      this.showSideError(`Fail`)
      this.load = false
    })
  }
}
