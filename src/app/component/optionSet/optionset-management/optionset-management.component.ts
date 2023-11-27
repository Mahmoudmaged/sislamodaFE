import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { VendorService } from 'src/app/Services/vendor.service';
declare let $: any;
@Component({
  selector: 'app-optionset-management',
  templateUrl: './optionset-management.component.html',
  styleUrls: ['./optionset-management.component.scss']
})
export class OptionsetManagementComponent implements OnInit {
  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  optionSetList: any[] = []
  fullOptionSetList: any[] = [];
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
     private _OptionSetService: OptionSetService) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.getOptionSetList()
  }

  ngOnInit(): void {

  }






  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }



  getOptionSetList() {
    this.load = true
    return this._OptionSetService.getOptionSet().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);
      this.fullOptionSetList = res;
      this.optionSetList = this.fullOptionSetList.slice(0, this.pageSize);
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
    this.optionSetList = this.fullOptionSetList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullOptionSetList = this.fullOptionSetList.filter(ele => {
        return ele.name.toLowerCase().includes(this.textSearch.toLowerCase()) || ele.displayNameAr.toLowerCase().includes(this.textSearch.toLowerCase()) || ele.displayNameEN.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullOptionSetList.length / this.pageSize);
      this.optionSetList = this.fullOptionSetList.slice(0, this.pageSize);

    } else {
      this.getOptionSetList()
    }

  }



  deleteOptionSet(id: string) {
    this.load = true;
    this._OptionSetService.deleteOptionSet(id).subscribe(res => {
      this.load = false;
      this.currentPage = 1;
      this.showSideError(`Done`);
      return this.getOptionSetList()
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
    this._Router.navigateByUrl('/admin/optionSet/add')
  }
  update(id: string) {
    this._Router.navigateByUrl(`/admin/optionSet/${id}/update`)

  }

 
  display(id: string) {
    this._Router.navigateByUrl(`/admin/optionSet/${id}/details`)
  }
}
