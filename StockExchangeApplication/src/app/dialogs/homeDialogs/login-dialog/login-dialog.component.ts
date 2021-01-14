import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WrongTransactionComponent } from 'src/app/alerts/account/wrong-transaction/wrong-transaction.component';
import { UserDb } from 'src/app/models/user-db';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private currentDialog:MatDialogRef<LoginDialogComponent>,
    private dialog:MatDialog,
    private authorizationService: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
       username:'',
       password:''
      })
    });
  }

  onSubmit(){
    this.authorizationService.sendAuthorization(this.loginFormGroup.get('login').value.username, this.loginFormGroup.get('login').value.password)
    .pipe(first())
    .subscribe({
        next: (result) => {
            if(result != null){
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account';
              this.router.navigateByUrl(returnUrl);
              this.currentDialog.close();
            }else{
              this.snackBar.openFromComponent(WrongTransactionComponent, {
                duration: 2300,
                data: {
                  message: 'Incorrect username or password'
                }
              });
            }
            
        }
    });
  }

  closeDialog(){
    this.currentDialog.close();
  }

  openRegistrationDialog(){
    this.closeDialog();
    this.dialog.open(RegistrationDialogComponent, { disableClose: true });
  }

}
