import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CorrectTransactionComponent } from 'src/app/alerts/account/correct-transaction/correct-transaction.component';
import { WrongTransactionComponent } from 'src/app/alerts/account/wrong-transaction/wrong-transaction.component';
import { UserDb } from 'src/app/models/user-db';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {

  public registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private currentDialog:MatDialogRef<RegistrationDialogComponent>,
              private dialog:MatDialog,
              private registraionService: RegistrationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
      registration: this.formBuilder.group({
       username:'',
       email:'',
       password:'',
       confirmPassword:''
      })
    });
  }

  onSubmit(){
    let component;
    let messageAlert;
    let newUser = new UserDb(this.username, this.password, this.email);
    if(this.password === this.confirmPassword){
      this.registraionService.sendRegistration(newUser)
      .pipe(first())
      .subscribe({
          next: (result) => {
              
              if(result == true){
                component = CorrectTransactionComponent;
                messageAlert = "Successfully registered!";
                this.currentDialog.close();
              }else{
                component = WrongTransactionComponent;
                messageAlert = "Your username is used! Please enter another.";
              }
              this.executeDailogAnswer(component, messageAlert);
          }
          
      });
    }else{
      component = WrongTransactionComponent;
      messageAlert = "Check your password!";
      this.executeDailogAnswer(component, messageAlert);
    }
  }

  executeDailogAnswer(component, messageAlert){
    this.snackBar.openFromComponent(component, {
      duration: 2300,
      data: {
        message: messageAlert
      }
    });
  }

  closeDialog(){
    this.currentDialog.close();
  }

  openLoginDialog(){
    this.closeDialog();
    this.dialog.open(LoginDialogComponent);
  }

  get username(){ return this.registrationFormGroup.get('registration').value.username; }
  get password(){ return this.registrationFormGroup.get('registration').value.password; }
  get confirmPassword(){ return this.registrationFormGroup.get('registration').value.confirmPassword; }
  get email(){ return this.registrationFormGroup.get('registration').value.email; }
}
