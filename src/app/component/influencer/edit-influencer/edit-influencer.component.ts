import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { InfluencerService } from 'src/app/Services/influencer.service';
declare let $: any;
@Component({
  selector: 'app-edit-influencer',
  templateUrl: './edit-influencer.component.html',
  styleUrls: ['./edit-influencer.component.scss']
})
export class EditInfluencerComponent {
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

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _InfluencerService: InfluencerService,
    private _AttachmentsService: AttachmentsService,
    private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

    this.getInfluencerById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
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




  addUserForm = new FormGroup({

    image: new FormControl('', []),
    id: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
  })



  getInfluencerById(id: string) {
    this.load = true;





    this._InfluencerService.getInfluencerById(id).subscribe(res => {
      this.addUserForm.controls.isActive.setValue(res?.isActive)
      this.addUserForm.controls.name.setValue(res?.name)
      this.addUserForm.controls.id.setValue(res?.id)
      this.addUserForm.controls.userId.setValue(res?.userId)

      this.user = res
      this.load = false;

    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }

  startShowError:boolean=false;

  handelAddUser() {
    this.load = true;





    if (this.addUserForm.invalid) {
      this.startShowError = true;
      this.load = false;
      return;
    }

    let data = {
      isActive: this.addUserForm.controls.isActive.value,
      name: this.addUserForm.controls.name.value,
      photoId: this.image ? this.image : this.user.photoId,
      userId: this.userInfo?.id,
      id: this.user.id
    }
    console.log({ data });


    this._InfluencerService.updateInfluencer(data).subscribe(res => {
      this.load = false;
      this._Router.navigateByUrl("/admin/influencer")
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
    this._Router.navigateByUrl('/admin/influencer')
  }
}
