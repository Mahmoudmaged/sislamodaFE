import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionSetItemService } from 'src/app/Services/option-set-item.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { VendorService } from 'src/app/Services/vendor.service';
declare let $: any;
@Component({
  selector: 'app-display-optionset',
  templateUrl: './display-optionset.component.html',
  styleUrls: ['./display-optionset.component.scss']
})
export class DisplayOptionsetComponent implements OnInit {
  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  optionSetList: any[] = []
  fullOptionSetList: any[] = [];
  optionSet: any;
  pages: number = 10;
  pageSize = 6;
  currentPage = 1
  load: boolean = false;
  sideMessage: string = '';
  dir: string = 'ltr'

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _OptionSetService: OptionSetService,
    private _OptionSetItemService: OptionSetItemService,
    private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.getOptionSet(this._ActivatedRoute.snapshot.paramMap.get('id')!)

  }

  ngOnInit(): void {

  }


  getOptionSet(id: string) {
    this.load = true;

    this._OptionSetService.getOptionSetById(id).subscribe(res => {
      console.log({ res });
      this.optionSet = res;
      this.pages = Math.ceil(res.optionSetItems.length / this.pageSize);
      this.fullOptionSetList = res.optionSetItems;
      this.optionSetList = this.fullOptionSetList.slice(0, this.pageSize);
      this.load = false;
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }






  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }





  getPageContent(page: number) {
    if (page <= 0) {
      page = 1
    }
    if (page >= this.pages) {
      page = this.pages
    }

    if (this.currentPage == page) {
      return;
    }

    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.optionSetList = this.fullOptionSetList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullOptionSetList = this.fullOptionSetList.filter(ele => {
        return ele.nameAr.toLowerCase().includes(this.textSearch.toLowerCase()) || ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullOptionSetList.length / this.pageSize);
      this.optionSetList = this.fullOptionSetList.slice(0, this.pageSize);

    } else {
      this.getOptionSet(this.optionSet.id)
    }

  }



  deleteOptionSet(id: string) {
    this.load = true;
    this._OptionSetItemService.deleteOptionSetItem(id).subscribe(res => {
      this.load = false;
      this.currentPage = 1;
      this.showSideError(`Done`);
      return this.getOptionSet(this.optionSet.id)

    }, err => {
      this.load = false;
      this.showSideError(`Fail to delete this vendor.`);
    })
  }

  deleteItemId: string = ''
  deletePromote(id: string) {
    $(".deleteLayer").show()
    this.deleteItemId = id
  }

  closeDeleteAlert() {
    $(".deleteLayer").hide()
  }

  confirmDelete() {
    this.closeDeleteAlert()
    if (this.deleteItemId) {
      this.deleteOptionSet(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }

  addOptionSet() {
    this._Router.navigateByUrl('/admin/optionSet/item/add')
  }
  update(id: string) {
    this._Router.navigateByUrl(`/admin/optionSet/item/${id}/update`)

  }

  displayOptionSetProf(id: string) {
    this._Router.navigateByUrl(`/admin/optionSet/${id}/details`)
  }
  displayOption(id: string) {
 
  }
}
