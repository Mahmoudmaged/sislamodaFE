import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { ProductService } from 'src/app/Services/product.service';
declare let $: any;
@Component({
  selector: 'app-add-optionset',
  templateUrl: './add-optionset.component.html',
  styleUrls: ['./add-optionset.component.scss']
})
export class AddOptionsetComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []
  optionList: any = []
  brandList: any = []
  image: any = false;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  selectedImages: any[] = []
  imagesList: any = []
  vendorData: any;
  dir: string = 'ltr'
  base: any;
  startShowError: boolean = false
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(
    private _Router: Router,
    private _OptionSetService: OptionSetService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

  }

  ngOnInit(): void {

  }




  addOptionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    displayNameAr: new FormControl('', [Validators.required]),
    displayNameEN: new FormControl('', [Validators.required])
  })





  handelAddOption() {
    this.load = true;
    if (this.addOptionForm.invalid) {
      this.load = false;
      this.startShowError = true;
      return;
    }
    let data = {
      name: this.addOptionForm.controls.name.value,
      displayNameAr: this.addOptionForm.controls.displayNameAr.value,
      displayNameEN: this.addOptionForm.controls.displayNameEN.value,
    }

    return this._OptionSetService.addOptionSet(data).subscribe(res => {
      this.load = false;
      this.cancel()
    },
      err => {
        // console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }




  cancel() {
    this._Router.navigateByUrl('/admin/optionSet')
  }
}
