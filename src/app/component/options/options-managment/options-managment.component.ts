import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsService } from 'src/app/Services/options.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { VendorService } from 'src/app/Services/vendor.service';
declare let $: any;
@Component({
  selector: 'app-options-managment',
  templateUrl: './options-managment.component.html',
  styleUrls: ['./options-managment.component.scss']
})
export class OptionsManagmentComponent implements OnInit {


  optionTypeEnum: any[] = [
    { type: 1, name: 'لون', nameEn: 'Color' },
    { type: 2, name: 'مقاس', nameEn: 'Size' },
    { type: 3, name: 'سعر', nameEn: 'Price' },
    { type: 4, name: 'خامات', nameEn: 'Materials' },
    { type: 5, name: 'مناسبه', nameEn: 'Occasion' },
    { type: 6, name: 'اجدد حاجه', nameEn: 'Last arrival' }
  ]
  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  optionsList: any[] = []
  fullOptionsList: any[] = [];
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
    private _vendorService: VendorService,
    private _OptionsService: OptionsService) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.getOptionsList()
  }

  ngOnInit(): void {

  }


  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }
  getOptionsList() {
    this.load = true
    return this._OptionsService.getOptionsItem().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);

      this.fullOptionsList = res;
      for (let i = 0; i < this.fullOptionsList.length; i++) {

        this.optionTypeEnum.find((ele) => {
          if (ele.type == this.fullOptionsList[i].optionType) {
            if (this.dir == 'ltr') {
              this.fullOptionsList[i].optionName = ele.nameEn
            } else {
              this.fullOptionsList[i].optionName = ele.name

            }
          }
        })

      }
      this.optionsList = this.fullOptionsList.slice(0, this.pageSize);
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError('Fail')
    })
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
    this.optionsList = this.fullOptionsList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullOptionsList = this.fullOptionsList.filter(ele => {
        return ele.name.toLowerCase().includes(this.textSearch.toLowerCase()) || ele.displayNameAr.toLowerCase().includes(this.textSearch.toLowerCase()) || ele.displayNameEN.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullOptionsList.length / this.pageSize);
      this.optionsList = this.fullOptionsList.slice(0, this.pageSize);

    } else {
      this.getOptionsList()
    }

  }



  deleteOptionSet(id: string) {
    this.load = true;
    this._OptionsService.deleteOptionsItem(id).subscribe(res => {
      this.load = false;
      this.currentPage = 1;
      this.showSideError(`Done`);
      return this.getOptionsList()
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
    this._Router.navigateByUrl('/admin/options/add')
  }
  update(id: string) {
    this._Router.navigateByUrl(`/admin/options/${id}/edit`)

  }
  display(id: string) {
    this._Router.navigateByUrl(`/admin/optionSet/${id}/details`)
  }
}

