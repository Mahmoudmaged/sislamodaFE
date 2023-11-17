import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { VendorService } from 'src/app/Services/vendor.service';
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

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(
    private _CookieService: CookieService,
    private _VendorService: VendorService,
    private _AuthService: AuthService, public _Router: Router,
    private _ActivatedRoute: ActivatedRoute) {
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    phoneNumber2: new FormControl('', [Validators.required]),
  })


  handelUpdateData() {
    this.load = true;
    // console.log({ rem: $(".checkBoxInput").is(":checked") });

    let Data = {
      email: this.personalForm.controls.email.value,
      password: this.personalForm.controls.password.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {

      this.load = false;
      //set token localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if ($(".checkBoxInput").is(":checked")) {
        // Set a cookie that expires in 30*12 days (1Year)
        this._CookieService.set('loginCredential', JSON.stringify(Data), 30 * 12);

      }
      //redirect homePage
      this._Router.navigateByUrl("/admin")
      //Navigate DashBored
      this.personalForm.reset();
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error;
        this.showSideError(`In-valid Email Or Password`)
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
      this.personalForm.controls.firstName.setValue(this.userData?.firstName);
      this.personalForm.controls.lastName.setValue(this.userData?.lastName);
      this.personalForm.controls.email.setValue(this.userData?.email);
      this.personalForm.controls.password.setValue(this.userData?.password);
      this.personalForm.controls.address.setValue(this.userData?.address);
      this.personalForm.controls.phone.setValue(this.userData?.phone);
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
