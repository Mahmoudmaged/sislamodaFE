import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { OptionSetItemService } from 'src/app/Services/option-set-item.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
declare let $: any;
@Component({
  selector: 'app-update-option-set-item',
  templateUrl: './update-option-set-item.component.html',
  styleUrls: ['./update-option-set-item.component.scss']
})
export class UpdateOptionSetItemComponent implements OnInit {

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
  optionSet: any;
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
    private _OptionSetItemService: OptionSetItemService,
    private _OptionSetService: OptionSetService, private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.getOptionSetItem(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllOptionSet()
      this.addOptionForm.controls.optionSetId.setValue(this.optionSet.optionSetId)

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

  getOptionSetItem(id: string) {
    this.load = true;


    this._OptionSetItemService.getOptionSetItemById(id).subscribe(res => {
      this.load = false;
      this.optionSet = res
      // console.log({ op: this.optionSet });
      this.addOptionForm.controls.color.setValue(this.optionSet.color)
      this.addOptionForm.controls.nameAr.setValue(this.optionSet.nameAr)
      this.addOptionForm.controls.nameEn.setValue(this.optionSet.nameEn)
      this.addOptionForm.controls.optionSetId.setValue(this.optionSet.optionSetId)
      this.addOptionForm.controls.value.setValue(this.optionSet.value)

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
    if (this.addOptionForm.invalid) {
      this.load = false;
      this.startShowError = true;
      return;
    }
    let data = {
      id: this.optionSet.id,
      value: this.addOptionForm.controls.value.value,
      optionSetId: this.addOptionForm.controls.optionSetId.value,
      nameAr: this.addOptionForm.controls.nameAr.value,
      nameEn: this.addOptionForm.controls.nameEn.value,
      color: this.addOptionForm.controls.color.value,
      isDefault: true
    }
    // console.log({ data });

    return this._OptionSetItemService.updateOptionSet(data).subscribe(res => {
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
