import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SignalrService {

  hubConn: signalR.HubConnection | undefined
  url: string = `${environment.apiBaseUrl}`;

  constructor() { }

  //建立SignalR 連線   
  public startConnection = () => {

    //建立SignalR Hub 連線，withUrl的參數要跟
    this.hubConn = new signalR.HubConnectionBuilder().withUrl(`${this.url}/myHub`).build();

    //開始連線
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

  //監聽要接收推播的SignalR Method
  public addMethodListener = () => {   
    this.hubConn?.on('GetRandomNumber', (data) => {
      console.log(data);
    })
  }
}
