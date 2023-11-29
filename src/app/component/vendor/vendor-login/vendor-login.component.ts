import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
declare let $: any;
@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.scss']
})
export class VendorLoginComponent {


  errorMessage: boolean = false;
  emailGlobal: String = ''
  load: boolean = false;
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load2: boolean = false;
  sideMessage: string = '';
  decoded: any;


  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(
    private _CookieService: CookieService,
    private _AuthService: AuthService, public _Router: Router) {
      if (localStorage.getItem("token")) {
        this._Router.navigateByUrl("/admin/")
      }
  }



  ngOnInit(): void {

    if (this._CookieService.get('loginCredential').length) {
      $('#rememberBox').prop('checked', true);
      this.loginForm.controls.email.setValue(JSON.parse(this._CookieService.get('loginCredential')).email);
      this.loginForm.controls.password.setValue(JSON.parse(this._CookieService.get('loginCredential')).password);
    }
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


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  forgetEmail = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  })

  forgetCode = new FormGroup({
    code: new FormControl('', [Validators.required])
  })

  resetForgetPassword = new FormGroup({
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    repeatPassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])
  })
  handelSignIn() {
    this.load = true;
    // console.log({ rem: $(".checkBoxInput").is(":checked") });

    let Data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {

      this.load = false;
      //set token localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.vendorData) {
      localStorage.setItem('vendorData', JSON.stringify(res.vendorData));
        
      }
      if ($(".checkBoxInput").is(":checked")) {
        // Set a cookie that expires in 30*12 days (1Year)
        this._CookieService.set('loginCredential', JSON.stringify(Data), 30 * 12);

      }
      //redirect homePage
      this._Router.navigateByUrl("/admin")
      //Navigate DashBored
      this.loginForm.reset();
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error;
        this.showSideError(`In-valid Email Or Password`)
      }
    )
  }

  handelForgetEmail() {
    this.load = true;

    let data = {
      email: this.forgetEmail.controls.email.value,
    }
    this._AuthService.forgetEmail(data).subscribe(res => {
      this.load = false;
      this.showSection('forgetCode')
    },
      err => {
        this.load = false;
        console.log({ err: err });

        this.showSideError(err?.error?.message || 'something went wrong')
      }
    )
  }

  handelSendCode() {
    this.load = true;

    let Data = {
      userName: this.loginForm.controls.email.value,
      code: this.forgetCode.controls.code.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {
      if (res.message == "Done") {
        this.load = false;
        //set token localStorage
        localStorage.setItem('token', res.token);
        //redirect homePage
        this._Router.navigateByUrl("/profile")
        //Navigate DashBored
        this.loginForm.reset();
      }
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error
        console.log(message);
        if (message == 'Validation error') {
          this.loginErrorMessage = "In-valid data please enter valid data";
        } else if (message == "Email not Exist") {
          this.loginErrorMessage = "This user is not registered please signUp first";
        } else if (message == "Email not confirmed yet") {
          this.loginErrorMessage = "Please confirm your email";
        } else if (message == "In-valid Password") {
          this.loginErrorMessage = "Please enter the correct password";
        } else {
          this.loginErrorMessage = `${message}`;
        }
      }
    )
  }

  handelResetForgetPassword() {
    this.load = true;

    let Data = {
      email: this.loginForm.controls.email.value,
      code: this.forgetCode.controls.code.value,
      password: this.resetForgetPassword.controls.password.value,
      repeatPassword: this.resetForgetPassword.controls.repeatPassword.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {
      if (res.message == "Done") {
        this.load = false;
        //set token localStorage
        localStorage.setItem('token', res.token);
        //redirect homePage
        this._Router.navigateByUrl("/profile")
        //Navigate DashBored
        this.loginForm.reset();
      }
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error
        console.log(message);
        if (message == 'Validation error') {
          this.loginErrorMessage = "In-valid data please enter valid data";
        } else if (message == "Email not Exist") {
          this.loginErrorMessage = "This user is not registered please signUp first";
        } else if (message == "Email not confirmed yet") {
          this.loginErrorMessage = "Please confirm your email";
        } else if (message == "In-valid Password") {
          this.loginErrorMessage = "Please enter the correct password";
        } else {
          this.loginErrorMessage = `${message}`;
        }
      }
    )
  }


  showSection(sec: string) {
    $(".loginSections").not(`.${sec}`).hide(200);
    $(`.${sec}`).show(300);

    switch (sec) {
      case 'forgetEmail':
        this.forgetEmail.controls.email.setValue(this.loginForm.controls.email.value)
        break;
      default:
        break;
    }

  }

  createAccount() {
    this._Router.navigateByUrl("/vendor/signup")
  }
}
