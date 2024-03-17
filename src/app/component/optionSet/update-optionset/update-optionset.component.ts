import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionSetService } from 'src/app/Services/optionset.service';
declare let $: any;
@Component({
  selector: 'app-update-optionset',
  templateUrl: './update-optionset.component.html',
  styleUrls: ['./update-optionset.component.scss']
})
export class UpdateOptionsetComponent implements OnInit {
  dir: string = 'ltr'
  load: boolean = false;
  sideMessage: string = '';
  errorMessage: string = ''
  userInfo: any;
  vendorData: any;
  optionSet: any;
  startShowError: boolean = false
  showSideError(message: string) {
    this.sideMessage = message;
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(
    private _Router: Router,
    private _OptionSetService: OptionSetService,
    private _ActivatedRoute: ActivatedRoute) {

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.getOptionSet(this._ActivatedRoute.snapshot.paramMap.get('id')!)


  }

  ngOnInit(): void {

  }



  getOptionSet(id: string) {
    this.load = true;

    this._OptionSetService.getOptionSetById(id).subscribe(res => {
      // console.log({res});

      this.optionSet = res;
      this.addOptionForm.controls.name.setValue(this.optionSet.name)
      this.addOptionForm.controls.displayNameAr.setValue(this.optionSet.displayNameAr)
      this.addOptionForm.controls.displayNameEN.setValue(this.optionSet.displayNameEN)
      this.load = false;
    },
      err => {
        // console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
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
      id: this.optionSet.id,
      name: this.addOptionForm.controls.name.value,
      displayNameAr: this.addOptionForm.controls.displayNameAr.value,
      displayNameEN: this.addOptionForm.controls.displayNameEN.value,
    }

    this._OptionSetService.updateOptionSet(data).subscribe(res => {
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
