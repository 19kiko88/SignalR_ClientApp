import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SignalrService {

  private hubConn: signalR.HubConnection | undefined
  private url: string = `${environment.apiBaseUrl}`;
  
  constructor() { }

  public startConnection = () => {
    this.hubConn = new signalR.HubConnectionBuilder().withUrl(`${this.url}/SignalR/Get`).build();
    this.hubConn.start()
    .then(() => {
      console.log('signalr connection start');
    })
    .catch(
      err => {
        console.log(err);
      }
    )
  }
}
