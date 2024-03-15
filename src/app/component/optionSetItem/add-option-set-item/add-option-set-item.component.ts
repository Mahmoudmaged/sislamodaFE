import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { OptionSetItemService } from 'src/app/Services/option-set-item.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
declare let $: any;
@Component({
  selector: 'app-add-option-set-item',
  templateUrl: './add-option-set-item.component.html',
  styleUrls: ['./add-option-set-item.component.scss']
})
export class AddOptionSetItemComponent implements OnInit {

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
  optionSetList: any[] = []

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
    private _OptionSetService: OptionSetService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllOptionSet()

    }, 1000);
    this.addOptionForm.controls.color.setValue(this.color)

  }

  getAllOptionSet() {
    this.load = true;

    this._OptionSetService.getOptionSet().subscribe(res => {
      this.load = false;
      this.optionSetList = res
      // console.log({ op: this.optionSetList });

    },
      err => {
        // console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }



  addOptionForm = new FormGroup({
    value: new FormControl('', [Validators.required]),
    optionSetId: new FormControl('', [Validators.required]),
    nameAr: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    color: new FormControl(this.color, [Validators.required]),
  })





  handelAddOption() {
    this.load = true;

    let data = {

      value: this.addOptionForm.controls.value.value,
      optionSetId: this.addOptionForm.controls.optionSetId.value,
      nameAr: this.addOptionForm.controls.nameAr.value,
      nameEn: this.addOptionForm.controls.nameEn.value,
      color: this.addOptionForm.controls.color.value,
      isDefault: true
    }
    // console.log({ data });

    this._OptionSetItemService.addOptionSetItem(data).subscribe(res => {
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
    this._Router.navigateByUrl(`admin/optionSet/${this.addOptionForm.controls.optionSetId.value}/details`)
  }
}
