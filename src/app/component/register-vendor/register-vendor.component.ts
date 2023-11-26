import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare let $: any;
@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.scss']
})
export class RegisterVendorComponent implements OnInit {
  errorMessage: boolean = false;
  emailGlobal: String = ''
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load: boolean = false;
  load2: boolean = false;
  decoded: any;

  sideMessage: string = '';


  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(private _AuthService: AuthService, public _Router: Router) {

    if (localStorage.getItem("token")) {
      this._Router.navigateByUrl("/admin/")
    }
    localStorage.clear();
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


  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    confirmPassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
  })

  storeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    phone2: new FormControl('', []),
  })


  handelSignUp() {
    console.log({ p: this.signupForm.controls.password.value, c: this.signupForm.controls.confirmPassword.value });

    if (this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value) {
      this.showSideError(`Password MisMatch confirmation Password`)
    } else {
      this.showSection('storeData')
    }
  }

  handelStorePhone() {
    this.load = true;

    if (!$(".checkBoxInput").is(":checked")) {
      this.load = false;
      return this.showSideError(`Please confirm to  website agreement`)
    } else {
      let data = {
        appUser: {
          isActive: true,
          isVendor: true,
          isAdmin: false,
          gender: 1,
          enableNotification: 1,
          firstName: this.signupForm.controls.firstName.value,
          middleName: this.signupForm.controls.firstName.value,
          lastName: this.signupForm.controls.lastName.value,
          address: this.signupForm.controls.address.value,
          email: this.signupForm.controls.email.value,
          userName: this.signupForm.controls.email.value,
          phoneNumber: this.signupForm.controls.phone.value,
          otherPhoneNumber: '',
          password: this.signupForm.controls.password.value,
          photoId: '',
          birthDate: '',
          pantsMeasurement: '',
          coachMeasurement: '',
          tShirtmeasurement: ''
        },
        vendor: {
          isActive: true,
          isApproved: true,
          name: this.storeForm.controls.name.value,
          nameEn: this.storeForm.controls.nameEn.value,
          description: this.storeForm.controls.description.value,
          descriptionEn: this.storeForm.controls.descriptionEn.value,
          ownerName: this.signupForm.controls.firstName.value,
          ownerPhoneNumber: this.storeForm.controls.phone.value,
          ownerPhoneNumber2: this.storeForm.controls.phone2.value,
          logoId: '',
          banerId: '',
          ownerId: ''
        }

      }

      return this._AuthService.registerVendor(data).subscribe(res => {
        this.load = false
        console.log({ res });
        this._Router.navigateByUrl("/vendor/login")
      },
        err => {
          this.load = false;
          console.log({ err });
          this.showSideError(`${err?.error?.message || 'Something went wrong please try again.'}`)
        }
      )
    }


  }


  showSection(sec: string) {
    $(".loginSections").not(`.${sec}`).hide(200);
    $(`.${sec}`).show(300);
  }

  login() {

    this._Router.navigateByUrl(`/vendor/login`)
  }
}
