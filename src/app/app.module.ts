import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/shareComponents/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VideoDetailsComponent } from './pages/video-details/video-details.component';
import { VideoListComponent } from './pages/video-list/video-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoDetailsComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
