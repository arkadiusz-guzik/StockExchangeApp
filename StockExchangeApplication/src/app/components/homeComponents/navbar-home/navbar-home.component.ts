import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionDialogComponent } from 'src/app/dialogs/accountDialogs/session-dialog/session-dialog.component';
import { LoginDialogComponent } from 'src/app/dialogs/homeDialogs/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from 'src/app/dialogs/homeDialogs/registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {

  constructor(private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.router.url != "/home"){
      this.dialog.open(LoginDialogComponent);
    }
  }

  openLoginDialog(){
    this.dialog.open(LoginDialogComponent, { disableClose: true });
 
  }

  openRegistrationDialog(){
    this.dialog.open(RegistrationDialogComponent, { disableClose: true });
  }
}
