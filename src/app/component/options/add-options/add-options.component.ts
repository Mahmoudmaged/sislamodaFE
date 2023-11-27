import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionSetItemService } from 'src/app/Services/option-set-item.service';
import { OptionsService } from 'src/app/Services/options.service';
declare let $: any;
@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss']
})
export class AddOptionsComponent implements OnInit {

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
  color: string = '#6466f1';
  optionSetList: any[] = [
    { type: 1, name: 'لون', nameEn: 'Color' },
    { type: 2, name: 'مقاس', nameEn: 'Size' },
    { type: 3, name: 'سعر', nameEn: 'Price' },
    { type: 4, name: 'خامات', nameEn: 'Materials' },
    { type: 5, name: 'مناسبه', nameEn: 'Occasion' },
    { type: 6, name: 'اجدد حاجه', nameEn: 'Last arrival' }
  ]

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(
    private _Router: Router,
    private _OptionSetItemService: OptionSetItemService,
    private _OptionsService: OptionsService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

  }

  ngOnInit(): void {
  }



  addOptionForm = new FormGroup({
    optionType: new FormControl('', [Validators.required]),
    nameAr: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    other: new FormControl(this.color, [Validators.required]),
  })





  handelAddOption() {
    this.load = true;
    let data = {
      optionType: this.addOptionForm.controls.optionType.value,
      name: this.addOptionForm.controls.nameAr.value,
      nameEn: this.addOptionForm.controls.nameEn.value,
      other: this.addOptionForm.controls.other.value,
    }

    this._OptionsService.addOptionsItem(data).subscribe(res => {
      this.load = false;
      this.cancel()
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }

  cancel() {
    this._Router.navigateByUrl(`admin/options`)
  }
}

