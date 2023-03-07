import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
private url = "Chat";
  constructor(private http: HttpClient) { }
  public getChats( ) : Observable<Chat[]>{
    
    return this.http.get<Chat[]>(`${environment.apiUrl}/${this.url}`);
  }
  public updateChat(chat:Chat ) : Observable<Chat[]>{
    
    return this.http.put<Chat[]>(`${environment.apiUrl}/${this.url}`,
     chat);
  }
  public createChat(chat:Chat ) : Observable<Chat[]>{
    
    return this.http.post<Chat[]>(`${environment.apiUrl}/${this.url}`,
     chat);
  }
  
  public deleteChat(chat: Chat): Observable<Chat[]> {
    return this.http.delete<Chat[]>(
      `${environment.apiUrl}/${this.url}/id?id=${chat.id}`
    );
  }
}
