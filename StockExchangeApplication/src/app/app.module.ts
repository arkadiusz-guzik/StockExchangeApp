import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { HeaderAccountComponent } from './containers/accountContainers/header-account/header-account.component';
import { NavbarAccountComponent } from './components/accountComponents/navbar-account/navbar-account.component';
import { HeaderHomeComponent } from './containers/homeContainers/header-home/header-home.component';
import { AccountBalanceComponent } from './components/accountComponents/account-balance/account-balance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginDialogComponent } from './dialogs/homeDialogs/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './dialogs/homeDialogs/registration-dialog/registration-dialog.component';
import { HeaderInfoComponent } from './components/homeComponents/header-info/header-info.component';
import { NavbarHomeComponent } from './components/homeComponents/navbar-home/navbar-home.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionTimeComponent } from './components/accountComponents/session-time/session-time.component';
import { SessionDialogComponent } from './dialogs/accountDialogs/session-dialog/session-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    HeaderHomeComponent,
    HeaderAccountComponent,
    AccountBalanceComponent,
    NavbarAccountComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
    HeaderInfoComponent,
    NavbarHomeComponent,
    SessionTimeComponent,
    SessionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
