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
@Input() hero?: Chat;
@Input() userGID: string  = '';

@Output() heroesUpdated = new EventEmitter<Chat[]>();

  constructor(private ChatService: ChatService,
    private appcomponent :AppComponent) { 
    
  }

  ngOnInit(): void {
  
  }

  updateHero(hero: Chat
    ){
    hero.name = this.givenName;
    hero.userId = this.userGID
    this.ChatService
    .updateHeros(hero)
    .subscribe((heroes: Chat[]) => this.heroesUpdated.emit(heroes));
    this.appcomponent.initNewHero();
  }

  deleteHero(hero: Chat
    ) {
    this.ChatService
      .deleteHeros(hero)
      .subscribe((heroes: Chat []) => this.heroesUpdated.emit(heroes));
      this.appcomponent.initNewHero();
  }

  createHero(hero: Chat
    ){
      hero.name = this.givenName+": ";
      hero.userId = this.userGID
    this.ChatService
    .createHeros(hero)
    .subscribe((heroes: Chat[]) => this.heroesUpdated.emit(heroes));
    this.appcomponent.initNewHero();
  }

}
