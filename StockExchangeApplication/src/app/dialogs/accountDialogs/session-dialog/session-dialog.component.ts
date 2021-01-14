import { Component, ComponentRef, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionTimeComponent } from 'src/app/components/accountComponents/session-time/session-time.component';
import { HeaderAccountComponent } from 'src/app/containers/accountContainers/header-account/header-account.component';
import { UserDto } from 'src/app/models/user-dto';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.scss']
})
export class SessionDialogComponent implements OnInit {

  authenticationFormGroup: FormGroup;

  constructor(
    private currentDialog:MatDialogRef<SessionDialogComponent>,
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder
    ){
    
  }

  ngOnInit(): void {
    this.authenticationFormGroup = this.formBuilder.group({
      confirmPassword: this.formBuilder.group({
       password:''
      })
    });
  }

  refreshToken(){
    if(this.authorizationService.userValue != null){
      this.authorizationService.sendAuthorization(this.authorizationService.userValue.username, this.authenticationFormGroup.get('confirmPassword').value.password).toPromise().then(res => this.currentDialog.close());
    }
  }

  closeDialog(){
    this.authorizationService.userSubject.next(null);
    this.currentDialog.close()
  }

}
