import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from '../services/auth.service';
import { userService } from '../services/userService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  givenName: string = '';
  userGID: string = '';
  @Output() dataChange = new EventEmitter<{ givenName: string; userGID: string }>(); 
  


  form = this.fb.group({
    username: ['', Validators.email],
    password: ['', Validators.required]
  });



  constructor(
    private router: Router,
    private userService: userService,
    private _ngZone: NgZone,
    private fb: FormBuilder,
    
    private _snackBar: MatSnackBar) { }
    updateData(username: string, userGID: string) {
    
      this.userService.setData(username);
      this.userService.setGID(userGID);
      this.givenName = this.userService.getData();
      this.userGID = this.userService.getGID();
      this.dataChange.emit({ givenName: this.givenName, userGID: this.userGID });
     const loginDiv = document.getElementById('loginDiv');
     if (loginDiv) {
      loginDiv.style.display = 'none';
      var message = document.getElementById('message') as HTMLButtonElement;
      if (message) {
        message.disabled = false;
     }
    }
    }
    
    ngOnInit() {

      // @ts-ignore
      window.onGoogleLibraryLoad = () => {
        // @ts-ignore
        google.accounts.id.initialize({
          client_id: '634085441712-ua472ml9q1tern06t1nfhvj3v86mvnrt.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true
        });
        // @ts-ignore
        google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
          { theme: "outline", size: "large", width: "100%" } 
        );
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      };
    }

    async handleCredentialResponse(response: CredentialResponse) {
      const responsePayload = decodeJwtResponse(response.credential);
        function decodeJwtResponse(token: string) {
          var base64Url = token.split(".")[1];
          var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          var jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          return JSON.parse(jsonPayload);
        }
      
        
        this.givenName = responsePayload.given_name;
       this.userGID = responsePayload.sub
       
        // Call the updateData() method with the required parameters
  this.updateData(responsePayload.given_name, responsePayload.sub);
     
  
     
  }
  
}
