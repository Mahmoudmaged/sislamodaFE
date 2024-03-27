import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/Services/chat.service';

declare let $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mainBar: any[] = [
    { item: 'listItem1', com: 'dashboard' },
    { item: 'listItem2', com: 'order' },
    { item: 'listItem3', com: 'product' },
    { item: 'listItem4', com: 'vendor' },
    { item: 'listItem5', com: 'inventory' },
    { item: 'listItem6', com: 'user' },
    { item: 'listItem7', com: 'financial' },
    { item: 'listItem8', com: 'content' },
    { item: 'listItem9', com: 'category' },
    { item: 'listItem10', com: 'sales' },
    { item: 'listItem11', com: 'settings' },
    { item: 'listItem12', com: 'offer' },
    { item: 'listItem13', com: 'brand' },
    { item: 'listItem18', com: 'ticket' },

    { item: 'listItem19', com: 'optionSet' },
    { item: 'listItem19', com: 'options' },
    { item: 'listItem19', com: 'options' },
    { item: 'listItem19', com: 'notification' }
  ]
  itemBar: any = {}
  dir: string = ''
  sideMessage: string = ''
  photo: string = `../../../assets/images/avatar/ava.png`
  userInfo: any;
  vendorData: any;
  lang: string = 'English'
  chatList: any[] = []
  chatInstance: any;
  load: boolean = false;
  constructor(
    public _Router: Router, public _ActivatedRoute: ActivatedRoute, public _ChatService: ChatService) {

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    if (this.userInfo?.isVendor) {
      this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    }

    this.photo = this.userInfo?.photo || this.photo;


  }

  ngOnInit() {

    if (this.vendorData) {
      this.clientName = this.userInfo?.firstName + '' + this.userInfo?.lastName
      this.showChatDialog(this.userInfo?.id)
    } else {
      this.getChatList()
    }


  }


  getChatList(page = 1, size = 1000) {
    this._ChatService.getAllChatList(page, size).subscribe(res => {
      this.chatList = res
      this.chatInstance = this.chatList[0]
      console.log({ chat: this.chatList });

    },
      err => {
        this.load = false;

      }
    )
  }

  getChatInstance(chatId: any, page = 1, size = 1000) {
    this._ChatService.getChatData(chatId, page, size).subscribe(res => {

      console.log({ chatIn: res });
      if (res.length) {
        this.chatInstance = { chat: res?.reverse(), myAppUserId: chatId, userChatId: res[0].userChatId }

      } else {
        this.chatInstance = { chat: res?.reverse(), myAppUserId: chatId, userChatId: null }


      }

    },
      err => {
        this.load = false;

      }
    )
  }

  sendMessageToClientOrVendor(data: any) {

    this._ChatService.messageToUser(data).subscribe(res => {

      console.log({ data });

      this.getChatInstance(this.chatInstance?.myAppUserId)
      this.messageForm.controls['message'].setValue('')



    },
      err => {
        this.load = false;

      }
    )
  }


  sendMessageToAdmin(data: any) {

    this._ChatService.messageFromUser(data).subscribe(res => {
      console.log({ sentRes: res });
      // $(".messageInput").val('');
      this.messageForm.controls['message'].setValue('')
      this.getChatInstance(this.chatInstance?.myAppUserId)

    },
      err => {
        this.load = false;

      }
    )
  }

  clientName: string = ''

  showChatDialog(id: string, index: number = 0) {

    if (this.chatList[index]) {
      this.clientName = this.chatList[index].myAppUser?.firstName + '' + this.chatList[index].myAppUser?.lastName
    }
    this.getChatInstance(id, 1, 1000)
    $(".chatDialog").show()
    // $(".chatDialog").animate({ scrollTop: $('.chatDialog').get(0).scrollHeight }, 1000);
    // $('.chatDialog').scrollTop($('.chatDialog').height());
  }
  closeChatDialog() {
    $(".chatDialog").hide()
  }
  closeChat(id: string) {
    $(".chatDialog").show()
  }
  closeUserList() {
    $(".chatHolderList").hide()

  }

  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  })

  sendMessage(chatInstance: any) {

    const data = {
      myAppUserId: chatInstance?.myAppUserId, //vendorID
      userChatId: chatInstance?.userChatId, //chatID
      message: this.messageForm.controls['message'].value,
      replayUserId: ""
    }


    if (this.userInfo.isVendor) {
      //vendor send message to admin
      this.sendMessageToAdmin({
        myAppUserId: data.myAppUserId, //vendorID
        message: data.message
      })

    } else {
      // alert(" admin send")
      //admin  send message to user or vendor
      data.replayUserId = this.userInfo.id
      // console.log({ chatInstance, data });

      this.sendMessageToClientOrVendor(data)
    }


  }

  changeBack() {
    $(".closeChat").css('background-color', 'rgba(0, 0, 0, .2)')
  }
}
