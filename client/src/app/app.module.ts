import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { LoginRedirect } from './services/login-redirect.service';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { HeaderComponent } from './header/header.component';
import { DiagnosticsService } from './diagnostics.service';
import { WebsocketService } from './websocket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, CommonModule, HttpClientModule, FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([
      {
        path: 'login',
        component: SignInComponent,
        canActivate: [LoginRedirect]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate:
          [EnsureAuthenticated]
      }
    ])
  ],
  providers: [DataService, AuthService, EnsureAuthenticated,
    LoginRedirect, DiagnosticsService, WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


