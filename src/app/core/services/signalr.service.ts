import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SignalrService {
  public broadcastMsg: string = '';
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

  //監聽Hub Method [HubMethodGetRandomNumber]並取得結果
  public addMethodListener = () => {   
    this.hubConn?.on('HubMethodGetRandomNumber', (data) => {
      console.log(data);
    })
  }

  //透過調用server端MyHub的BraodCast方法，來調用Hub Method [HubMethodBroadcast]
  public broadcastMessage(msg: string): void{
    this.hubConn?.invoke('BraodCast', msg)
    .catch(err => {
      console.error(err);
    })
  }

  //監聽Hub Method [HubMethodBroadcast]並取得結果
  public broadcastMethodListener(): void{
    this.hubConn?.on('HubMethodBroadcast', (data) => {
      this.broadcastMsg = data;
      console.log(data);
    })
  }
}
