import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { UserService } from 'src/app/Services/user.service';
declare let $: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []
  optionList: any = []
  userList: any = []
  image: any ;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  selectedImages: any[] = []
  imagesList: any = []
  vendorData: any;
  dir: string = 'ltr'
  base: any;
  user: any;

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _userService: UserService,
    private _AttachmentsService: AttachmentsService, private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
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
        console.log({ err });
      }
      )

    };
    reader.readAsDataURL(file);

  }

  removeImage() {
    this.selectedImage = ''
    this.image = false;
    this.addUserForm.controls.image.setValue('')
  }




  addUserForm = new FormGroup({
    image: new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    isSupperAdmin: new FormControl(false, [Validators.required]),
  })





  handelAddUser() {
    this.load = true;
    if (this.image) {
      this.showSideError(`Please upload  product images`)
    }



    let data = {
      user: {
        userTypes: 1,
        isSupperAdmin: this.addUserForm.controls.isSupperAdmin.value,
        name: this.addUserForm.controls.userName.value,
        phoneNumber: this.addUserForm.controls.phoneNumber.value,
        email: this.addUserForm.controls.email.value,
        photoId: this.image
      },

      appUser: {
        firstName: this.addUserForm.controls.firstName.value,
        middleName: this.addUserForm.controls.middleName.value,
        lastName: this.addUserForm.controls.lastName.value,
        userName: this.addUserForm.controls.userName.value,
        address: this.addUserForm.controls.address.value,
        phoneNumber: this.addUserForm.controls.phoneNumber.value,
        email: this.addUserForm.controls.email.value,
        password: this.addUserForm.controls.password.value,
        photoId: this.image
      }
    }
    console.log({ data });



    this._userService.addUser(data).subscribe(res => {
      console.log({ res });

      this.load = false;
      this._Router.navigateByUrl("/admin/user")
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }



  ngOnInit(): void {

  }

  cancel() {
    this._Router.navigateByUrl('/admin/user')
  }
}
