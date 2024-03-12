import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OfferService } from 'src/app/Services/offer.service';
declare let $: any;
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent {
  selectedValues: string[] = [];
  offerList: any = []
  base: any;
  image: any;
  errorMessage: string = ''
  userInfo: any;
  vendorData: any;
  selectedImage: string = '';
  categoryList: any = [];
  load: boolean = false;
  sideMessage: string = '';
  dir: string = 'ltr';
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  removeImage() {
    this.selectedImage = ''
    this.image = false;
    this.addOfferForm.controls.photoId.setValue('')
  }


  constructor(
    private _CategoryService: CategoryService, private _AttachmentsService: AttachmentsService, private _OfferService: OfferService, private _Router: Router) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    console.log({ userInfo: this.userInfo });

    this.getAllCategory()
  }

  getAllCategory() {
    return this._CategoryService.categoryList().subscribe(res => {
      this.categoryList = res;
    }, err => {
      this.showSideError("Fail to load product category list ")
    })
  }
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  addOfferForm = new FormGroup({
    photoId: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    titleEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    percent: new FormControl(0, [Validators.required]),
    offerType: new FormControl(this.randomIntFromInterval(1, 4), []),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
    offerCategoryId: new FormControl('', [Validators.required]),
    vendorId: new FormControl('', []),
    isForVendor: new FormControl(false, [Validators.required]),
  })

  handelAddOffer() {

    this.load = true;
    if (!this.image) {
      this.errorMessage = "Image is required"
    }
    let data = this.addOfferForm.value
    data.photoId = this.image
    data.vendorId = this.userInfo?.isVendor ? this.vendorData?.id : null;
    data.isForVendor = this.userInfo?.isVendor ? true : false;
    data.percent = (data.percent || 0) / 100;
    this._OfferService.addOffer(data).subscribe((res) => {
      this.load = false
      this._Router.navigateByUrl("/admin/offers")
    }, err => {
      this.load = false;
      this.showSideError('Fail to add please try again')
    })
  }


  selectImage(event: any) {
    this.load = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onload = (e: any) => {

      const acceptTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
      if (!acceptTypes.includes(event.target.files[0].type)) {
        this.load = false;
        return this.showSideError(`In-valid file type ${event.target.files[0].type?.split("/")[1]}`);
      } else {
        this.selectedImage = e.target.result;

        this.base = this.selectedImage
        console.log({ fileName: event.target.files[0].type, file: this.selectedImage.split("base64,")[1] });

        return this._AttachmentsService.uploadAttachBase64({
          fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
        }).subscribe(res => {
          this.image = res
          this.load = false;

          console.log({ res });
        }, err => {
          this.load = false;

          console.log({ err });
        })
      }

    };
  }

  close() {
    this._Router.navigateByUrl("/admin/offers")
  }
}
