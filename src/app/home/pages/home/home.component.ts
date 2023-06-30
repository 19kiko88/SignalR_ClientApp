import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/core/services/signalr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _signalrService: SignalrService,
    private _http: HttpClient
    ) { }

  ngOnInit(): void 
  {
    //建立SignalR 連線    
    this._signalrService.startConnection();

    //監聽Hub Method [HubMethodGetRandomNumber]並取得結果
    this._signalrService.addMethodListener();

    //透過呼叫api，調用Hub Method [HubMethodGetRandomNumber]，並取得結果
    this._http.get<any>(`${environment.apiBaseUrl}/api/SignalR/Subscribe`).subscribe(res => {       
      console.log(res.message);
    })

    //監聽Hub Method [HubMethodGetRandomNumber]並取得結果
    this._signalrService.broadcastMethodListener();
  }

  //發送廣播訊息
  broadcastMessage(): void{
    this._signalrService.broadcastMessage("1111");
  }
}
