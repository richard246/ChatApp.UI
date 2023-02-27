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
  public updateHeros(hero:Chat ) : Observable<Chat[]>{
    
    return this.http.put<Chat[]>(`${environment.apiUrl}/${this.url}`,
     hero);
  }
  public createHeros(hero:Chat ) : Observable<Chat[]>{
    
    return this.http.post<Chat[]>(`${environment.apiUrl}/${this.url}`,
     hero);
  }
  
  public deleteHeros(hero: Chat): Observable<Chat[]> {
    return this.http.delete<Chat[]>(
      `${environment.apiUrl}/${this.url}/id?id=${hero.id}`
    );
  }
}
