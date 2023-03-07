import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html',
  styleUrls: ['./edit-chat.component.css']
})
export class EditChat implements OnInit {
  @Input()  givenName: string = '';
  @Output() dataChange = new EventEmitter<string>();
@Input() chat?: Chat;
@Input() userGID: string  = '';

@Output() chatsUpdated = new EventEmitter<Chat[]>();

  constructor(private ChatService: ChatService,
    private appcomponent :AppComponent) { 
    
  }

  ngOnInit(): void {
  
  }

  updateChat(chat: Chat
    ){
    chat.name = this.givenName;
    chat.userId = this.userGID
    this.ChatService
    .updateChat(chat)
    .subscribe((heroes: Chat[]) => this.chatsUpdated.emit(heroes));
    this.appcomponent.initNewChat();
  }

  deleteChat(chat: Chat
    ) {
    this.ChatService
      .deleteChat(chat)
      .subscribe((chats: Chat []) => this.chatsUpdated.emit(chats));
      this.appcomponent.initNewChat();
  }

  createChat(chat: Chat
    ){
      chat.name = this.givenName+": ";
      chat.userId = this.userGID
    this.ChatService
    .createChat(chat)
    .subscribe((chats: Chat[]) => this.chatsUpdated.emit(chats));
    this.appcomponent.initNewChat();
  }

}
