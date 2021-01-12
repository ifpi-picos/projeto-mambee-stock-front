import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomeModule } from './pages/home/home.module';
import { MessageErrorModule } from './shared/components/message-error/message-error.module';
import { DefaultModule } from './shared/components/default/default.module';
import { NgxMaskModule } from 'ngx-mask';
import { ItensModule } from './pages/itens/itens.module';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxMaskModule.forRoot({validation: false}),
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HomeModule,
    MessageErrorModule,
    DefaultModule,
    ItensModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
