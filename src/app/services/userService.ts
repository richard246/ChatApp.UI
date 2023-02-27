import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class userService {
  public givenName: string = '';
  public userGID : string = '';

  getData(): string {
    return this.givenName;
  }
  getGID(): string{
    return this.userGID;
  }
  setGID(userGID: string){
    this.userGID = userGID
    console.log(userGID);
  }

  setData(givenName: string) {
    this.givenName = givenName;
    console.log(givenName);
  }
  
}