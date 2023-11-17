import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
declare let $: any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  categoryList: any[] = []

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(private _CategoryService: CategoryService, private _Router: Router) {
    this.getCategoryList()
  }

  ngOnInit(): void {

  }

  getCategoryList() {
    this.load = true
    return this._CategoryService.categoryList().subscribe(res => {
      this.categoryList = res
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError(`Fail to load category list`)
    })
  }

  textSearch: string = ''

  onSearch() {
    if (this.textSearch) {
      console.log(this.categoryList);
      console.log(this.textSearch);

      this.categoryList = this.categoryList.filter(ele => {
        return ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase())
      });

    } else {
      this.getCategoryList()
    }

  }
  showDropDown(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }


  changeOrderStatus(btn: string, status: string) {
    $(`.${btn}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')

    if (status == 'Category') {
      this._Router.navigateByUrl("/admin/category/add")
    } else {
      this._Router.navigateByUrl("/admin/category/add/sub")
    }

  }

  getCategoryDetails(id: string) {
    this._Router.navigateByUrl(`/admin/category/${id}/details`)
  }

}
