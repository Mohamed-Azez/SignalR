import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService } from '../signalr.service';
import signalR from '@aspnet/signalr';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        public signalrService: SignalrService,
        public router: Router,
      ) {}

        hubConnection?:signalR.HubConnection;
        //Added in tutorial 2
        personName?: string;
    
        startConnection = () => {
            this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/toastr', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
        
            this.hubConnection
            .start()
            .then(() => {
            })
            .catch(err => console.log('Error while starting connection: ' + err))
        }
    
}