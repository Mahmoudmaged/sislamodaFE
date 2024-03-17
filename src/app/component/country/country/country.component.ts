import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/Services/country.service';
import { OptionsService } from 'src/app/Services/options.service';
import { VendorService } from 'src/app/Services/vendor.service';

declare let $: any;
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {

  defaultImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  countryList: any[] = []
  fullCountryList: any[] = [];
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
    private _CountryService: CountryService,
    private _OptionsService: OptionsService) {
    this.dir = localStorage.getItem('dir') || 'ltr';

    this.getAllCountries()
  }

  ngOnInit(): void {

  }


  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }
  getAllCountries() {
    this.load = true
    return this._CountryService.getAllCountryList().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);

      this.fullCountryList = res;
      this.countryList = this.fullCountryList.slice(0, this.pageSize);
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
    this.countryList = this.fullCountryList.slice(skip, skip + this.pageSize);

  }

  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullCountryList = this.fullCountryList.filter(ele => {
        return ele.nameEn?.toLowerCase().includes(this.textSearch.toLowerCase()) 
             || ele.name?.toLowerCase().includes(this.textSearch.toLowerCase()) ;
      });

      this.pages = Math.ceil(this.fullCountryList.length / this.pageSize);
      this.countryList = this.fullCountryList.slice(0, this.pageSize);

    } else {
      this.getAllCountries()
    }

  }



  deleteCountry(id: string) {
    this.load = true;
    this._CountryService.delete(id).subscribe(res => {
      this.load = false;
      this.currentPage = 1;
      this.showSideError(`Done`);
      return this.getAllCountries()
    }, err => {
      this.load = false;
      console.log({err});
      
      this.showSideError(`Fail to delete this country.`);
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
      this.deleteCountry(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }

  addCountry() {
    this._Router.navigateByUrl('/admin/country/add')
  }

  update(id: string) {
    this._Router.navigateByUrl(`/admin/country{id}/edit`)

  }
  display(id: string) {
    this._Router.navigateByUrl(`/admin/country/${id}/details`)
  }
}
