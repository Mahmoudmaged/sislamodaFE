import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OfferService } from 'src/app/Services/offer.service';
declare let $: any;
@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {
  selectedValues: string[] = [];
  offerList: any = []
  base: any;
  image: any;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  categoryList: any = [];
  load: boolean = false;
  sideMessage: string = '';
  offer: any;
  vendorData:any;
  dir: string = 'ltr';

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CategoryService: CategoryService,
    private _AttachmentsService: AttachmentsService,
    private _OfferService: OfferService,
    private _Router: Router) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.userInfo = JSON.parse(localStorage.getItem('user')!);

    this.getAllCategory()
  }

  ngOnInit(): void {
    this.getOffer(this._ActivatedRoute.snapshot.paramMap.get('id')!)
  }

  getAllCategory() {
    return this._CategoryService.categoryList().subscribe(res => {
      this.categoryList = res;
    }, err => {
      this.showSideError("Fail to load product category list ")
    })
  }

  getOffer(id: string) {
    this.load = true;
    return this._OfferService.getOfferById(id).subscribe(res => {
      this.offer = res;
      this.addOfferForm.controls.code.setValue(this.offer.code)
      this.addOfferForm.controls.title.setValue(this.offer.title)
      this.addOfferForm.controls.titleEn.setValue(this.offer.titleEn)
      this.addOfferForm.controls.description.setValue(this.offer.description)
      this.addOfferForm.controls.descriptionEn.setValue(this.offer.descriptionEn)
      this.addOfferForm.controls.percent.setValue((this.offer.percent ||0)*100 )
      this.addOfferForm.controls.offerType.setValue(this.offer.offerType)
      this.addOfferForm.controls.startDate.setValue(this.offer.startDate)
      this.addOfferForm.controls.endDate.setValue(this.offer.endDate)
      this.addOfferForm.controls.isActive.setValue(this.offer.isActive)
      setTimeout(() => {
        this.addOfferForm.controls.offerCategoryId.setValue(this.offer.offerCategoryId)
      }, 1000);
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError("Fail to load product category list ")
    })
  }

  addOfferForm = new FormGroup({
    id: new FormControl('', []),
    vendorId: new FormControl('', []),
    photoId: new FormControl('', []),
    code: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    titleEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    percent: new FormControl(0, [Validators.required]),
    offerType: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
    offerCategoryId: new FormControl('', [Validators.required]),
    isForVendor: new FormControl(false, [Validators.required]),

  })

  handelUpdateOffer() {
    this.load = true;
    let data = this.addOfferForm.value
    data.id = this.offer.id
    data.photoId = this.image ? this.image : this.offer.photoId
    data.percent = (data.percent || 0)/100;
    data.vendorId = this.userInfo?.isVendor ? this.vendorData?.id : null;
    data.isForVendor = this.userInfo?.isVendor ? true : false;

console.log({data});

    this._OfferService.updateOffer(data).subscribe((res) => {
      this.load = false
      this._Router.navigateByUrl("/admin/offers")
    }, err => {
      this.load = false;
      console.log({ err });

      this.showSideError('Fail to update please try again')
    })
  }

  selectImage(event: any) {
    this.load = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;

      this.base = this.selectedImage
      console.log({ fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1] });

      return this._AttachmentsService.uploadAttachBase64({
        fileName: event.target.files[0].name, file: this.selectedImage.split("base64,")[1]
      }).subscribe(res => {
        this.load = false;
        this.image = res
        console.log({im:this.image});
        
      }, err => {
        this.load = false;
        this.showSideError('Fail to upload offer image please try again')
      }
      )

    };
    reader.readAsDataURL(file);

  }
  removeImage() {
    this.selectedImage = ''
    this.image = false;
    this.addOfferForm.controls.photoId.setValue('')
  }



  close() {
    this._Router.navigateByUrl("/admin/offers")
  }
}
