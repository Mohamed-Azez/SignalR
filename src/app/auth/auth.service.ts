import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService } from '../signalr.service';
import signalR from '@aspnet/signalr';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        public signalrService: SignalrService,
        public router: Router
      ) {
          //3Tutorial
          let tempPersonId = localStorage.getItem("personId");
          if (tempPersonId) {
              if (this.signalrService.hubConnection) { //if already connected
                this.reauthMeListener();
                this.reauthMe(tempPersonId);
              }
              else {
                this.signalrService.ssObs().subscribe((obj: any) => {
                    if (obj.type == "HubConnStarted") {
                      this.reauthMeListener();
                      this.reauthMe(tempPersonId!);
                    }
                });
              }
          }
      }


    public isAuthenticated: boolean = false;


    //2Tutorial  
    async authMe(person: string, pass: string) {
        let personInfo = {userName: person, password: pass};
    
        await this.signalrService.hubConnection?.invoke("authMe", personInfo)
        .then(() => console.log("Loging in attempt..."))
        .catch(err => console.error(err));
    }


    //3Tutorial
    authMeListenerSuccess() { 
        debugger
        this.signalrService.hubConnection?.on("authMeResponseSuccess", (personId: string, personName: string) => {
            debugger
            console.log(personId);
            console.log(personName);

            localStorage.setItem("personId", personId);
            this.signalrService.personName = personName;
            this.isAuthenticated = true;
            console.log("Login successful!");
            this.signalrService.router.navigateByUrl("/home");
        });
    }

    //2Tutorial
    authMeListenerFail() {
        this.signalrService.hubConnection?.on("authMeResponseFail", () => {
            console.log("Wrong credentials!");
        });
    }    
    
    
    //3Tutorial
    async reauthMe(personId: string) {    
        await this.signalrService.hubConnection?.invoke("reauthMe", personId)
        .then(() => console.log("Loging in attempt..."))
        .catch(err => console.error(err));
    }
    



    //3Tutorial
    reauthMeListener() {
        this.signalrService.hubConnection?.on("reauthMeResponse", (personId: string, personName: string) => {
            console.log(personId);
            console.log(personName);

            this.signalrService.personName = personName;
            this.isAuthenticated = true;
            console.log("Re-authenticated!");
            if (this.signalrService.router.url == "/auth") this.signalrService.router.navigateByUrl("/home");
        });
    }



}