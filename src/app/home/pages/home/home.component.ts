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

    //開始監聽要訂閱的SignalR Hub Method(GetRandomNumber)
    this._signalrService.addMethodListener();

    //訂閱Hub Method
    this._http.get<any>(`${environment.apiBaseUrl}/api/SignalR/Subscribe`).subscribe(res => {       
      console.log(res.message);
    })
  }
}
