import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/Services/chat.service';

declare  let $:any;
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
  load:boolean=false;
  constructor(
    public _Router: Router, public _ActivatedRoute: ActivatedRoute, public _ChatService: ChatService) {

    this.dir = localStorage.getItem('dir') || 'ltr';
    this.userInfo = JSON.parse(localStorage.getItem('user')!);
    if (this.userInfo?.isVendor) {
      this.vendorData = JSON.parse(localStorage.getItem('vendorData')!);
    }

    this.photo = this.userInfo?.photo || this.photo;
    this.getChatList()

  }

  ngOnInit() {

   

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

      this.chatInstance = { chat: res?.reverse(), myAppUserId: chatId, userChatId: res[0].userChatId }
      console.log({ getChatInstance: this.chatInstance });

    },
      err => {
        this.load = false;

      }
    )
  }

  sendMessageToClientOrVendor(data: any) {

    this._ChatService.messageToUser(data).subscribe(res => {
      console.log({ sentRes: res });
      $(".messageInput").val('');
    },
      err => {
        this.load = false;

      }
    )
  }


  sendMessageToAdmin(data: any) {

    this._ChatService.messageFromUser(data).subscribe(res => {
      console.log({ sentRes: res });
      $(".messageInput").val('');
    },
      err => {
        this.load = false;

      }
    )
  }


  showChatDialog(id: string) {
    this.getChatInstance(id, 1, 1000)
    $(".chatDialog").show()
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

  sendMessage(myAppUserId: string, userChatId: string) {

    const data = {
      "myAppUserId": myAppUserId, //vendorID
      "userChatId": userChatId, //chatID
      "message": $(".messageInput").val(),
      "replayUserId": ""
    }
    console.log({nn:this.userInfo});
    
    if (this.userInfo.isAdmin) {
      this.sendMessageToClientOrVendor(data)

    } else {

      //vendor send message to admin
      this.sendMessageToAdmin({
        "myAppUserId": myAppUserId, //vendorID
        "message": $(".messageInput").val()
      })
    }


  }

  changeBack() {
    $(".closeChat").css('background-color', 'rgba(0, 0, 0, .2)')
  }
}
