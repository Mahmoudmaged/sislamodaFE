import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionSetItemService } from 'src/app/Services/option-set-item.service';
import { OptionsService } from 'src/app/Services/options.service';
declare let $: any;
@Component({
  selector: 'app-edit-options',
  templateUrl: './edit-options.component.html',
  styleUrls: ['./edit-options.component.scss']
})
export class EditOptionsComponent implements OnInit {

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
    private _ActivatedRoute: ActivatedRoute,
    private _OptionsService: OptionsService) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.getOptionById(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.addOptionForm.controls.optionType.setValue(this.option?.optionType)
      this.addOptionForm.controls.color.setValue(this.option?.other)

    }, 1000);

  }

  option: any;
  getOptionById(id: string) {
    this.load = true;
    this._OptionsService.getOptionItemById(id).subscribe(res => {
      this.option = res;
      this.addOptionForm.controls.optionType.setValue(res.optionType)
      this.addOptionForm.controls.nameAr.setValue(res.name)
      this.addOptionForm.controls.nameEn.setValue(res.nameEn)
      this.addOptionForm.controls.color.setValue(res.other)
      this.color = res.other
      this.load = false;
    }, err => {
      this.load = false
      this.showSideError("Fail")
    })
  }


  addOptionForm = new FormGroup({
    optionType: new FormControl('', [Validators.required]),
    nameAr: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    color: new FormControl(this.color, [Validators.required]),
  })

  startShowError: boolean = false
  handelAddOption() {

    this.load = true;

    if (this.addOptionForm.invalid) {
      this.load = false;
      this.startShowError = true;
      return;
    }
    let data = {
      id: this.option.id,
      optionType: this.addOptionForm.controls.optionType.value,
      name: this.addOptionForm.controls.nameAr.value,
      nameEn: this.addOptionForm.controls.nameEn.value,
      other: this.addOptionForm.controls.color.value,
    }
    // console.log({ data });


    this._OptionsService.updateOptions(data).subscribe(res => {
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
    this._Router.navigateByUrl(`admin/options`)
  }
}
