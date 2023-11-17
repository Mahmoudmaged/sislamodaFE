import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare let $: any;
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  errorMessage: boolean = false;
  emailGlobal: String = ''
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load: boolean = false;
  load2: boolean = false;
  decoded: any;
  constructor(private _AuthService: AuthService, public _Router: Router) {
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



  handelSignUp() {
    this.load = true;
    console.log({ rem: $(".checkBoxInput").is(":checked") });

    let Data = {
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {
      if (res.message == "Done") {
        this.load = false;
        //set token localStorage
        localStorage.setItem('token', res.token);
        //redirect homePage
        this._Router.navigateByUrl("/profile")
        //Navigate DashBored
        this.signupForm.reset();
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

  login(){
    this._Router.navigateByUrl("/")
  }


}
