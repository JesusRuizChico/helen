import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { router } from './routers';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component'

import { AuthServices } from './services/auth.services';

import { AuthGuards } from './guards/auth.guard.services';

import { UserServices } from './services/user.services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrerComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    TransferHttpCacheModule,
    AngularFirestoreModule,

  ],
  providers: [AuthServices, AuthGuards, UserServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
