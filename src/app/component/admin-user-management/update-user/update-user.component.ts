import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { UserService } from 'src/app/Services/user.service';
declare let $: any;
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
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

  startShowError:boolean=false;

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
    this.getUserById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
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
    this.addUserForm.controls.image.setValue('')
  }

  getUserById(id: string) {
    this.load = true;



    this._userService.getById(id).subscribe(res => {
      this.user = res
      // console.log({ user: this.user});

      this.addUserForm.controls.name.setValue(this.user.name)
      this.addUserForm.controls.email.setValue(this.user.email)
      this.addUserForm.controls.isSupperAdmin.setValue(this.user.isSupperAdmin)
      this.addUserForm.controls.phoneNumber.setValue(this.user.phoneNumber)
      this.load = false;

    },
      err => {
        // console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )


  }


  addUserForm = new FormGroup({
    image: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    isSupperAdmin: new FormControl(false, [Validators.required]),
  })





  handelAddUser() {
    this.load = true;

    if (this.addUserForm.invalid) {
      this.startShowError = true;
      this.load = false;
      return;
    }
    if (this.image) {
      this.showSideError(`Please upload  product images`)
    }



    let data = {
      id: this.user.id,
      userTypes: 1,
      isSupperAdmin: this.addUserForm.controls.isSupperAdmin.value,
      name: this.addUserForm.controls.name.value,
      phoneNumber: this.addUserForm.controls.phoneNumber.value,
      email: this.addUserForm.controls.email.value,
      photoId: this.image ? this.image : this.user.photoId,
      appUserId: this.user.appUserId,
      vendorId: null
    }


    this._userService.updateUser(data).subscribe(res => {
      this.load = false;
      this._Router.navigateByUrl("/admin/user")
    },
      err => {
        // console.log({ err });
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
