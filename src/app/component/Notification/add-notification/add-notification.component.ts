import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { NotificationService } from 'src/app/Services/notification.service';
declare let $: any;
@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []

  optionList: any[] = [];

  optionsGroups: any[] = [];
  selectedOptions: any[] = [];


  brandList: any = []
  errorMessage: string = ''
  userInfo: any;
  vendorData: any;
  dir: string = 'ltr'

  selectedImage: string = '';
  base: any;
  image: any;

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _NotificationService: NotificationService,
    private _AttachmentsService: AttachmentsService) {
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
    this.addForm.controls.photoId.setValue('')
  }





  addForm = new FormGroup({
    photoId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    titleEn: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEn: new FormControl('', [Validators.required])
  })




  handelAddNotification() {
    this.load = true;
    if (!this.image) {
      this.showSideError(`Please upload  notification images`)
    }




    let data = {
      title: this.addForm.controls.title.value,
      titleEn: this.addForm.controls.titleEn.value,
      description: this.addForm.controls.description.value,
      descriptionEn: this.addForm.controls.descriptionEn.value,
      photoId: this.image,
    }


    this._NotificationService.addNotification(data).subscribe(res => {
      this.load = false;
      this._Router.navigateByUrl("/admin/notification")
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



  closeProductDetailsSec() {
    this._Router.navigateByUrl(`admin/notification`)

  }
}