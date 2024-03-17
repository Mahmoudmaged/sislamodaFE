import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/attachments.service';
import { TicketManagementService } from 'src/app/Services/ticket-management.service';
import { UserService } from 'src/app/Services/user.service';
declare let $: any;
@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
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
  startShowError: boolean = false;

  showSideError(message: string) {
    this.sideMessage = message
    $(".sideAlert").css({ "right": "0%" })
    setTimeout(() => {
      $(".sideAlert").css({ "right": "-200%" })
    }, 3000);
  }

  constructor(private _Router: Router,
    private _ticketService: TicketManagementService,
    private _AttachmentsService: AttachmentsService, private _ActivatedRoute: ActivatedRoute) {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
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
    if (this.image) {
      return this.showSideError(`Please upload  product images`)
    }



    let data = {
      name: this.addTicketForm.controls.name.value,
      description: this.addTicketForm.controls.description.value,
      message: this.addTicketForm.controls.message.value,
      phone: this.addTicketForm.controls.phoneNumber.value,
      email: this.addTicketForm.controls.email.value,
      vendorId: this.vendorData?.id
      // appUserId: this.user.id
    }


    return this._ticketService.addTicket(data).subscribe(res => {
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



  ngOnInit(): void {

  }

  cancel() {
    this._Router.navigateByUrl('/admin/ticket')
  }
}
