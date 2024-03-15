import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
declare let $: any;
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {
  originalCategoryList: any[] = []
  categoryList: any[] = []
  category: any;
  textSearch: string = ''
  findSub: string = `Their is no subcategory for this category...`
  dir = 'ltr'
  load: boolean = false;
  sideMessage: string = '';
  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  onSearch() {
    if (this.textSearch) {


      this.categoryList = this.originalCategoryList.filter(ele => {
        return ele.nameEn.toLowerCase().includes(this.textSearch.toLowerCase()) ||ele.name.toLowerCase().includes(this.textSearch.toLowerCase())
      });
      if (!this.categoryList.length) {
        this.findSub = `No matching result`
      }

    } else {
      this.categoryList = this.originalCategoryList
    }

  }
  constructor(private _CategoryService: CategoryService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) {
    this.getSubCategoriesById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    this.getCategoryById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    this.dir = localStorage.getItem('dir') || 'ltr'
  }

  ngOnInit(): void {

  }

  getCategoryById(id: any) {
    return this._CategoryService.getCategoryWithId(id).subscribe(res => {
      this.category = res
      // console.log({ res });

    }, err => {
      // console.log({ err });

    })
  }

  getSubCategoriesById(id: any) {
    return this._CategoryService.getListOfSubCategoriesById(id).subscribe(res => {
      this.originalCategoryList = res
      this.categoryList = res
      // console.log({ res });

    }, err => {
      // console.log({ err });

    })
  }

  showDropDown(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }



  navigateToSubCategory() {
    this._Router.navigateByUrl("/admin/category/add/sub")
  }

  getCategoryDetails(id: string) {
    this.getSubCategoriesById(id!)
    this.getCategoryById(id!)
  }


  showUpdateCategory(id: any) {

    if (!this.category.mainCategoryId) {
      this._Router.navigateByUrl(`/admin/category/${id}/edit`)
    } else {
      this._Router.navigateByUrl(`/admin/category/${id}/sub/edit`)
    }
  }

  deleteCategory(id: any) {
    this.load = true
    this._CategoryService.deleteCategoryById(id).subscribe(res => {
      this.load = false
      this._Router.navigateByUrl("/admin/category")

    }, err => {
      this.load = false;
      this.showSideError(`Fail to delete`)
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
      this.deleteCategory(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }

}
