import { Component } from '@angular/core';
import { Chat } from './models/chat';
import { ChatService } from './services/chat.service';
import { userService } from './services/userService'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  givenName: string = '';
  userGID: string = '';
  title = 'Chat.UI';
  Chats: Chat[] = [];
  heroToEdit?: Chat;

  constructor(private ChatService: ChatService, private userService:userService) {}

  ngOnInit(): void {
    
    this.ChatService
      .getChats()
      .subscribe((result: Chat[]) => (this.Chats = result));
    this.givenName
  }

  updateData(newName: string, newGID: string) {
    console.log(newGID)
    console.log(newName)
    this.userService.givenName = newName;
    this.userService.userGID = newGID;
    this.givenName = newName;
    this.userGID = newGID;
  }

  updateHeroList(heroes: Chat[]) {
    this.Chats = heroes;
  }

  initNewHero() {
    this.heroToEdit = new Chat();
    const message = document.getElementById('message');
    if (message) {
      message.style.display = 'none';
   }
  }

  editHero(hero: Chat) {
    this.heroToEdit = hero;
  }
}