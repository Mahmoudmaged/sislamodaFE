import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { VendorService } from 'src/app/Services/vendor.service';
import { AttachmentsService } from 'src/app/Services/attachments.service';
declare let $: any;
@Component({
  selector: 'app-vendor-profile-details',
  templateUrl: './vendor-profile-details.component.html',
  styleUrls: ['./vendor-profile-details.component.scss']
})
export class VendorProfileDetailsComponent implements OnInit {



  errorMessage: boolean = false;
  emailGlobal: String = ''
  load: boolean = false;
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load2: boolean = false;
  sideMessage: string = '';
  decoded: any;
  vendorData: any;
  userData: any;
  dir: string = 'ltr'

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  selectedImage: string = '';
  base: any;
  image: any;
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
  }
  constructor(
    private _CookieService: CookieService,
    private _VendorService: VendorService,
    private _AuthService: AuthService, public _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _AttachmentsService: AttachmentsService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.getVendorProfile(this._ActivatedRoute.snapshot.paramMap.get('id')!)
  }



  ngOnInit(): void {

  }
  showPassword(action: string, id: string) {

    if (action == 'show') {
      $(`#${id}`).siblings(".fa-eye-slash").hide()
      $(`#${id}`).siblings(".fa-eye").show()
      $(`#${id}`).attr("type", "text")
    } else {
      $(`#${id}`).siblings(".fa-eye").hide()
      $(`#${id}`).siblings(".fa-eye-slash").show()
      $(`#${id}`).attr("type", "password")

    }

  }


  personalForm = new FormGroup({
    photoId: new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),


    name: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    phoneNumber2: new FormControl('', [Validators.required]),
  })


  handelUpdateData() {
    this.load = true;

    let userData = {
      id: this.userData?.id,
      photoId: this.image ? this.image : this.userData.photoId,
      firstName: this.personalForm.controls.firstName.value,
      middleName: this.personalForm.controls.middleName.value,
      lastName: this.personalForm.controls.lastName.value,
      userName: this.personalForm.controls.userName.value,
      email: this.personalForm.controls.email.value,
      otherPhoneNumber: this.personalForm.controls.phone.value

    }

    let storeData = {
      id: this.vendorData.id,
      name: this.personalForm.controls.name.value,
      nameEn: this.personalForm.controls.nameEn.value,
      description: this.personalForm.controls.description.value,
      descriptionEn: this.personalForm.controls.descriptionEn.value,
      ownerPhoneNumber: this.personalForm.controls.phoneNumber.value,
      ownerPhoneNumber2: this.personalForm.controls.phoneNumber2.value,
      ownerId: this.vendorData?.ownerId,
      isApproved: true


    }
    console.log({ userData });
    console.log({ storeData });

    this._AuthService.updateUserData(userData).subscribe(res => {

      this._VendorService.updateVendorStore(storeData).subscribe(res => {
        this.load = false;
        this.showSideError("Done")
      }, err => {
        this.load = false;
        console.log({ err });
        this.showSideError(`Fail vendor`)
      })

    },
      err => {
        this.load = false;
        console.log({ err });
        this.showSideError(`Fail `)
      }
    )
  }


  getVendorProfile(id: string) {
    this.load = true;

    this._VendorService.getVendorById(id).subscribe(res => {
      this.vendorData = res;
      this.personalForm.controls.name.setValue(this.vendorData?.name);
      this.personalForm.controls.nameEn.setValue(this.vendorData?.nameEn);
      this.personalForm.controls.description.setValue(this.vendorData?.description);
      this.personalForm.controls.descriptionEn.setValue(this.vendorData?.descriptionEn);
      this.personalForm.controls.phoneNumber.setValue(this.vendorData?.ownerPhoneNumber);
      this.personalForm.controls.phoneNumber2.setValue(this.vendorData?.ownerPhoneNumber2);
      this.getUserProfile(this.vendorData?.ownerId)

      this.load = false;
    },
      err => {
        this.load = false;
        this.showSideError(`In-valid vendor Id`)
      }
    )
  }

  getUserProfile(id: string) {
    this.load = true;
    this._AuthService.getUserData(id).subscribe(res => {
      this.userData = res;
      console.log({ x: this.userData });

      this.personalForm.controls.firstName.setValue(this.userData?.firstName);
      this.personalForm.controls.lastName.setValue(this.userData?.lastName);
      this.personalForm.controls.middleName.setValue(this.userData?.middleName);
      this.personalForm.controls.userName.setValue(this.userData?.userName);
      this.personalForm.controls.email.setValue(this.userData?.email);
      this.personalForm.controls.address.setValue(this.userData?.address);
      this.personalForm.controls.phone.setValue(this.userData?.otherPhoneNumber);
      this.load = false;
    },
      err => {
        this.load = false;
        this.showSideError(`In-valid vendor Id`)
      }
    )
  }


  showSection(sec: string) {
    $(".loginSections").not(`.${sec}`).hide(200);
    $(`.${sec}`).show(300);
  }

}
