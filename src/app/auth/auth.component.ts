import { Component } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
  constructor(
    public signalrService: SignalrService,
    public authService: AuthService //3Tutorial
  ) { }

  ngOnInit(): void {
    console.log(this.signalrService.hubConnection);
    
    // this.authService.authMeListenerSuccess();
    // this.authService.authMeListenerFail();
     this.authMeListenerSuccess();
    this.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection?.off("authMeResponseSuccess");
    this.signalrService.hubConnection?.off("authMeResponseFail");
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    // this.authService.authMe(form.value.userName, form.value.password);
    this.authMe(form.value.userName, form.value.password);
    form.reset();
  }
//2Tutorial  
async authMe(person: string, pass: string) {debugger
  let personInfo = {userName: person, password: pass};

  await this.signalrService.hubConnection?.invoke("authMe", personInfo)
  .then(() => console.log("Loging in attempt..."))
  .catch(err => console.error(err));
}


//3Tutorial
authMeListenerSuccess() { 
  debugger
  this.signalrService.hubConnection?.on("authMeResponseSuccess", (person: any) => {
      debugger
      console.log(person.id);
      console.log(person.name);

      localStorage.setItem("personId", person.id);
      this.signalrService.personName = person.name;
      this.authService.isAuthenticated = true;
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

  // async authMe(user: string, pass: string) {
  //   debugger
  //   let personInfo = {userName: user, password: pass};

  //   await this.signalrService.hubConnection?.invoke("authMe", personInfo)
  //   .finally(() => {
  //    console.log("Loging in attempt...")
  //   })
  //   .catch(err => console.error(err));
  // }



  // private authMeListenerSuccess() {
  //   this.signalrService.hubConnection?.on("authMeResponseSuccess", (personInfo: any) => {
  //       console.log(personInfo);
  //       this.signalrService.personName = personInfo.name;
  //       console.log("Login successful!");
  //       this.signalrService.router.navigateByUrl("/home");
  //   });
  // }


  // private authMeListenerFail() {
  //   this.signalrService.hubConnection?.on("authMeResponseFail", () => {
  //     console.log("Wrong credentials!");
  //   });
  // }

}