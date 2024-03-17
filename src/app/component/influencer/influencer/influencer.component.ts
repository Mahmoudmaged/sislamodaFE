import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencerService } from 'src/app/Services/influencer.service';
declare let $: any;
@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})
export class InfluencerComponent {
  dummyImage: string = '../../../assets/images/Sislimoda/SislimodaAdmin/items/images.png'
  userList: any[] = []
  fullUserList: any[] = []
  pages: number = 10;
  pageSize = 8
  currentPage = 1
  sideMessage: string = '';
  load: boolean = false
  dir: string = 'ltr'

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }
  constructor(private _InfluencerService: InfluencerService, private _Router: Router) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.getAllInfluencer()
  }

  ngOnInit(): void {

  }


  getAllInfluencer() {
    this.load = true;
    return this._InfluencerService.getAllInfluencerList().subscribe(res => {
      this.pages = Math.ceil(res.length / this.pageSize);
      this.fullUserList = res;
      this.userList = this.fullUserList.slice(0, this.pageSize);
      this.load = false;
    }, err => {
      this.load = false;
      this.showSideError(`Fail to load product list.`);
    }
    )

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

    // console.log({ page });
    $(`.page`).removeClass('ActivePage')
    $(`.page${page}`).addClass('ActivePage')
    this.currentPage = page
    const skip = ((this.currentPage - 1) * this.pageSize)
    this.userList = this.fullUserList.slice(skip, skip + this.pageSize);

  }
  previousPage() {
    this.getPageContent(this.currentPage - 1)
  }
  nextPage() {
    this.getPageContent(this.currentPage + 1)
  }

  addUser() {
    this._Router.navigateByUrl('admin/influencer/add')
  }
  displayUserInquiries() {

  }

  closeVendorProf() {
    $(".VendorProfSec").css({ "visibility": "hidden" })
    $(".VendorTable").show(300)
  }


  textSearch: string = ''
  onSearch() {
    if (this.textSearch) {

      this.fullUserList = this.fullUserList.filter(ele => {
        return ele.name.toLowerCase().includes(this.textSearch.toLowerCase())
      });

      this.pages = Math.ceil(this.fullUserList.length / this.pageSize);
      this.userList = this.fullUserList.slice(0, this.pageSize);

    } else {
      this.getAllInfluencer()
    }

  }


  deleteUserById(id: string) {
    this.load = true
    this._InfluencerService.deleteInfluencer(id).subscribe(res => {
      this.load = false
      this.showSideError("Done")
      this.getAllInfluencer()
    }, err => {
      this.load = false;
      this.showSideError(`Fail`)
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
      this.deleteUserById(this.deleteItemId)
    } else {
      this.showSideError(`Fail`)
    }
  }

  edit(id: string) {
    this._Router.navigateByUrl(`/admin/influencer/${id}/edit`)
  }

  view(id: string) {
    this._Router.navigateByUrl(`/admin/influencer/${id}/details`)
  }
}
