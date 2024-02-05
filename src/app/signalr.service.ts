import { Injectable, inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalrService {
    public personId?:string;
    constructor(
        public router: Router //2Tutorial
        ) { }


    hubConnection?:signalR.HubConnection;
    //2Tutorial
    personName?: string;

    //3Tutorial
    ssSubj = new Subject<any>();
    ssObs(): Observable<any> {
        return this.ssSubj.asObservable();
    }

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
            this.ssSubj.next({type: "HubConnStarted"});
        })
        .catch(err => console.log('Error while starting connection: ' + err))
    }}