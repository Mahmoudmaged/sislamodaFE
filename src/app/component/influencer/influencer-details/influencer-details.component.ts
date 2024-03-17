import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfluencerService } from 'src/app/Services/influencer.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
declare let $: any;
@Component({
  selector: 'app-influencer-details',
  templateUrl: './influencer-details.component.html',
  styleUrls: ['./influencer-details.component.scss']
})
export class InfluencerDetailsComponent {
  load: boolean = false
  sideMessage: string = ''
  user: any;
  dummyImage: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  dir: string = 'ltr'
  optionSet: any = {};


  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _InfluencerService: InfluencerService,
    public _ActivatedRoute: ActivatedRoute,) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);

    this.getInfluencerById(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }



  ngOnInit(): void {
  }

  getInfluencerById(id: string) {
    this.load = true;
    this._InfluencerService.getInfluencerById(id).subscribe(res => {

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




  close() {
    this._Router.navigateByUrl(`admin/influencer`)

  }
}
