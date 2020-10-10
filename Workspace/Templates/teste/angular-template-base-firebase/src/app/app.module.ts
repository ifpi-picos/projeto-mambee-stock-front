import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { MessageErrorModule } from './shareds/componets/message-error/message-error.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HomeModule,
    UsersModule,
    MessageErrorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
