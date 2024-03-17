import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { CountryService } from 'src/app/Services/country.service';
import { customAlphabet } from 'nanoid'
declare let $: any;
@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent {
  load: boolean = false;
  sideMessage: string = '';
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []
  optionList: any = []
  userList: any = []
  image: any;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  selectedImages: any[] = []
  imagesList: any = []
  vendorData: any;
  dir: string = 'ltr'
  base: any;
  user: any;
  staticCountryList: any;
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _CountryService: CountryService,
    private _AttachmentsService: AttachmentsService,
    private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.getStaticCountryList()
  }




  getStaticCountryList() {
    this.staticCountryList = this._CountryService.getAllCountry()
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
    // this.addCountryForm.controls.image.setValue('')
  }




  addCountryForm = new FormGroup({
    // country: new FormControl('', [Validators.required]),
    isActive: new FormControl(true, [Validators.required]),
  })



  startShowError: boolean = false;



  handelAddCountry() {
    this.load = true;

    if (this.addCountryForm.invalid) {
      this.startShowError = true;
      this.load = false;
      return;
    }
    if (this.image) {
      return this.showSideError(`Please upload  product images`)
    }


    for (const country of this.selectedOp) {
      const customNanoId = customAlphabet('0123456789', 5)
      this._CountryService.add({
        countryId: parseInt(customNanoId()),
        isActive: this.addCountryForm.controls.isActive.value,
        name: this.staticCountryList[country].name?.arabic,
        nameEn: this.staticCountryList[country].name?.english,
        code: this.staticCountryList[country].code,
        isoCode: this.staticCountryList[country].code,
      }).subscribe(res => {
        this.load = false;
        this._Router.navigateByUrl("/admin/country")
      },
        err => {
          this.load = false;
          console.log({ err });

          this.showSideError(`Some thing went wrong please try again`)
        }
      )
    }


  }


  productOptions: any = []
  selectedOp: any = []
  addOption(index: any) {


    if (!this.selectedOp.includes(index)) {
      this.selectedOp.push(index)
    } else {
      this.selectedOp = this.selectedOp.filter((ele: any) => {
        return ele != index;
      })

    }
  }



  ngOnInit(): void {

    $(".fa-angle-down").on('click', function () {
      $(".dropDownBody").slideDown()
      $(".fa-angle-down").hide()
      $(".fa-angle-up").show()
    })

    $(".fa-angle-up").on('click', function () {
      $(".dropDownBody").slideUp()
      $(".fa-angle-down").show()
      $(".fa-angle-up").hide()
    })
  }

  cancel() {
    this._Router.navigateByUrl('/admin/country')
  }
}
