import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { OptionSetService } from 'src/app/Services/optionset.service';
import { TicketManagementService } from 'src/app/Services/ticket-management.service';
import { UserService } from 'src/app/Services/user.service';

declare let $: any;
@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {
  load: boolean = false;
  sideMessage: string = '';
  productOptions: any = [];
  productSelectedOptions: any = [];
  selectedValues: string[] = [];
  subcategoryList: any[] = []
  categoryList: any = []
  optionList: any = []
  userList: any = []
  image: any = false;
  errorMessage: string = ''
  userInfo: any;
  selectedImage: string = '';
  selectedImages: any[] = []
  imagesList: any = []
  vendorData: any;
  dir: string = 'ltr'
  base: any;
  user: any;
  startShowError:boolean=false;


  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _OptionSetService: OptionSetService,
    private _ticketService: TicketManagementService,
    private _AttachmentsService: AttachmentsService, private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    this.getTicketById(this._ActivatedRoute.snapshot.paramMap.get('id')!)
    this.getOptionSetByNames()
  }


  showDropDown(ind: number) {

    //remover from siblings
    $(`.dropdown-menu-list`).not(`.dropdown-menu-list${ind}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.search_dropdownMenuButton${ind}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.dropdown-menu-list${ind}`).slideToggle(300)
    $(`.search_dropdownMenuButton${ind}`).toggleClass('search_dropdownMenuButton_click')
  }

  showDropDownFilter(classSelector: string, dropdownSelector: string) {
    //remover from siblings
    $(`.dropdown-menu-list`).not(`.${dropdownSelector}`).slideUp(300)
    $('.search_dropdownMenuButton').not(`.${classSelector}`).removeClass('search_dropdownMenuButton_click')
    //Display target dropdown
    $(`.${dropdownSelector}`).slideToggle(300)
    $(`.${classSelector}`).toggleClass('search_dropdownMenuButton_click')
  }

  selectedOptionId: any;
  changeOrderStatus(orderId: string, btnIndicator: number, color: string, statusId: string, value: any, nameEn: string, nameAr: string, opId: string) {
    this.load = true;
    let status = nameEn;
    if (this.dir == 'rtl') {
      status = nameAr
    }
    // console.log({ color });

    $(`.search_dropdownMenuButton${btnIndicator}`).text(status)
    $(`.dropdown-menu-list`).slideUp(300)
    $('.search_dropdownMenuButton').removeClass('search_dropdownMenuButton_click')
    $(`.search_dropdownMenuButton${btnIndicator}`).css({ 'background-color': color })

    this.selectedOptionId = opId;
    this.load = false
    const data = {
      opId,
      Id: orderId,
      Value: value,
      Name: this.optionSet.name
    }
    console.log({ data });
    // this._OrderService.updateOrderStatus(data).subscribe(res => {
    //   this.load = false
    //   this.showSideError("Done")

    // }, err => {
    //   this.load = false
    //   // console.log({ err });
    //   this.showSideError("fail")
    // })


  }

  optionSet: any;
  getOptionSetByNames() {
    this._OptionSetService.getOptionSetByNames(['TicketStatus']).subscribe(res => {
      this.optionSet = res[0]
      // console.log({ res: this.optionSet });
    }, err => {
      this.showSideError('Fail')
    })
  }
  ngOnInit(): void {
    this.getOptionSetByNames()

  }




  addTicketForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    message: new FormControl('', [Validators.required]),
  })




  handelAddTicket() {
    this.load = true;

    if (this.addTicketForm.invalid) {
      this.startShowError = true;
      this.load = false;
      return;

    }
  



    let data = {
      id: this.ticket.id,
      name: this.addTicketForm.controls.name.value,
      description: this.addTicketForm.controls.description.value,
      message: this.addTicketForm.controls.message.value,
      phone: this.addTicketForm.controls.phoneNumber.value,
      email: this.addTicketForm.controls.email.value,
      ticketStatusId: this.selectedOptionId,
      vendorId: this.ticket.vendorId,
      // appUserId: this.user.id,

    }


    this._ticketService.updateTicket(data).subscribe(res => {
      this.load = false;
      console.log({ res });

      this._Router.navigateByUrl("/admin/ticket")
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }
  ticket: any;
  getTicketById(id: string) {
    this.load = true;


    this._ticketService.getById(id).subscribe(res => {
      this.ticket = res
      this.addTicketForm.controls['description'].setValue(this.ticket.description)
      this.addTicketForm.controls['phoneNumber'].setValue(this.ticket.phone)
      this.addTicketForm.controls['email'].setValue(this.ticket.email)
      this.addTicketForm.controls['name'].setValue(this.ticket.name)
      this.addTicketForm.controls['message'].setValue(this.ticket.message)
      this.selectedOptionId = this.ticket.ticketStatusId
      this.load = false;
      console.log({ res });
    },
      err => {
        console.log({ err });
        this.load = false;
        this.showSideError(`Some thing went wrong please try again`)
      }
    )
  }




  cancel() {
    this._Router.navigateByUrl('/admin/ticket')
  }
}
