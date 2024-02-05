import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './signalr.service';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers:[SignalrService,BrowserModule,CommonModule,AppRoutingModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit{

  constructor( 
    public signalrService: SignalrService
  ) 
  {}


  ngOnInit() {
    this.signalrService.startConnection();


  }

  
  ngOnDestroy() {
    this.signalrService.hubConnection?.off("askServerResponse");
  }
}