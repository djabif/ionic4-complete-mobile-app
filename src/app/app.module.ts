import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SDKBrowserModule } from '../../sdk/index';

import { ManageQuestionPage } from './manage-question/manage-question.page';

@NgModule({
  declarations: [AppComponent, ManageQuestionPage],
  entryComponents: [ManageQuestionPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
