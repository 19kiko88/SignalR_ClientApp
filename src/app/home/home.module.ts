import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [  
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class HomeModule { }
