import { Component, OnInit } from '@angular/core';


import { ChatService } from '../modules/http/chat.service';


import { ServerResponse } from '../modules/models/ws_models/server.response.model';
import { ServerRequest } from '../modules/models/ws_models/server.request.model';
import { Conversation } from '../modules/models/ws_models/conversation.model';
import { Chatter } from '../modules/models/ws_models/chatter.model';
import { Message } from '../modules/models/ws_models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employer/messenger.component.html',
  styles: []
})
export class EmployerMessengerComponent implements OnInit {
  title = 'app works!';

  conversationList: Conversation[];

  constructor(private chatService: ChatService) {

    this.conversationList = [];


  }

  ngOnInit() {

    if (this.chatService.connected) {
      console.log('Connected.....');
      console.log('requesting conversation list');
      this.chatService.getConversationList();
    }
    this.subscribeChatService();
    console.log('ng init!!!!!!!!!!!');
  }


  private subscribeChatService() {

    this.chatService.ws.subscribe(
      (response) => {
        console.log('subscribing in messenger.....');
        console.dir(response);

        if (!response) {
          return null;
        }

        if (response.type === 'handshake') {
          this.chatService.getConversationList();
        }

        if (response.dataType === 'ConversationList') {
          this.initializeConversationList(response);
        }

        if (response.dataType === 'UpdateMessage') {
          this.updateMessage(response);
        }

      }
    )

  }

  private initializeConversationList(response) {
    console.log('initializing conversation list .....');

    let myId = this.getMyId();

    if (response.data) {

      for (let conversation of response.data) {
        let newConversation = new Conversation();
        newConversation.Id = conversation._id;

        newConversation.subject.Id = conversation.subject._id;
        newConversation.subject.title = conversation.subject.jobTitle;

        for (let message of conversation.message) {
          let newMessage = new Message();

          newMessage.id = message._id;
          newMessage.createdAt = message.createdAt;
          newMessage.updatedAt = message.updatedAt;
          newMessage.text = message.text;



          if (message.sender) {
            newMessage.sender.Id = message.sender._id;
            newMessage.sender.fName = message.sender.fName;
            newMessage.sender.lName = message.sender.lName;
          }

          if (message.seenBy) {
            for (let seenBy of message.seenBy) {
              let seen = new Chatter();
              seen.Id = seenBy._id;
              seen.fName = seenBy.fName;
              seen.lName = seenBy.lName;

              newMessage.seenBy.push(seen);
            }
          }



          newMessage.deliveredAt = message.deliveredAt;


          newConversation.message.push(newMessage);
        }


        for (let chatter of conversation.chatters) {
          if (chatter._id === myId) {
            newConversation.me.Id = chatter._id;
            newConversation.me.fName = chatter.fName;
            newConversation.me.lName = chatter.lName;
          } else {
            let newChatter: Chatter = new Chatter();
            newChatter.Id = chatter._id;
            newChatter.fName = chatter.fName;
            newChatter.lName = chatter.lName;
            newConversation.otherChatters.push(newChatter);
          }
        }
        this.conversationList.push(newConversation);
      }
      console.dir(this.conversationList);

    } else {
      console.log('NO DATA!!!');
    }

  }

  private updateMessage(response) {
    console.log('response arrived...');
    console.dir(response);

    if (!response.data) {
      return null;
    }

    for (let data of response.data) {

      for (let conversation of this.conversationList) {

        if (conversation.Id === data.conversationId) {
          let newMessage = new Message();

          newMessage.id = data.message._id;

          newMessage.text = data.message.text;



          if (data.message.sender) {
            newMessage.sender.Id = data.message.sender._id;
            newMessage.sender.fName = data.message.sender.fName;
            newMessage.sender.lName = data.message.sender.lName;
          }

          if (data.message.seenBy) {
            for (let seenBy of data.message.seenBy) {
              let seen = new Chatter();
              seen.Id = seenBy._id;
              seen.fName = seenBy.fName;
              seen.lName = seenBy.lName;

              newMessage.seenBy.push(seen);
            }
          }


          conversation.message.push(newMessage);

        }
      }

    }

  }

  private getMyId() {

    if (localStorage.getItem('currentUser')) {
      let user = JSON.parse(localStorage.getItem('currentUser'));

      if (!user) {
        return '';
      }
      if (!user._id) {
        return '';
      }
      return user._id;
    } else {
      return '';
    }


  }






  public sendMessage(conversationId, senderId, subjectId, event) {
    console.log('sending message .....');
    console.log('conversation ' + conversationId);
    console.log('sender ' + senderId);
    console.log('subject ' + subjectId);

    let text = event.target[0].value;
    event.target[0].value = '';

    let request = new ServerResponse();

    request.type = 'NewMessage';
    request.status = '';
    request.message = '';
    request.data = [
      {
        conversationId: conversationId,
        senderId: senderId,
        subjectId: subjectId,
        text: text
      }
    ];
    request.dataType = 'NewMessage';
    request.sender = senderId;

    this.chatService.ws.next(request);

  }

}
