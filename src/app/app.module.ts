import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { ListCreatorComponent } from './creator/list.creator.component';

import { AuthServices } from './services/auth.services';

import { AuthGuards } from './guards/auth.guard.services';

import { UserServices } from './services/user.services';
import { ListsServices } from './services/lists.services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrerComponent,
    ListCreatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(router),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    TransferHttpCacheModule,
    AngularFirestoreModule,

  ],
  providers: [AuthServices, AuthGuards, UserServices, ListsServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
