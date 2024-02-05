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
    public signalrService: SignalrService
  ) { }

  ngOnInit(): void {
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

    this.authMe(form.value.userName, form.value.password);
    form.reset();
  }


  async authMe(user: string, pass: string) {
    let personInfo = {userName: user, password: pass};

    await this.signalrService.hubConnection?.invoke("authMe", personInfo)
    .finally(() => {
     console.log("Loging in attempt...")
    })
    .catch(err => console.error(err));
  }



  private authMeListenerSuccess() {
    this.signalrService.hubConnection?.on("authMeResponseSuccess", (personInfo: any) => {
        console.log(personInfo);
        this.signalrService.personName = personInfo.name;
        console.log("Login successful!");
        this.signalrService.router.navigateByUrl("/home");
    });
  }


  private authMeListenerFail() {
    this.signalrService.hubConnection?.on("authMeResponseFail", () => {
      console.log("Wrong credentials!");
    });
  }

}