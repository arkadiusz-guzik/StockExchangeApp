import { OnChanges, PipeTransform, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { SessionDialogComponent } from 'src/app/dialogs/accountDialogs/session-dialog/session-dialog.component';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-session-time',
  templateUrl: './session-time.component.html',
  styleUrls: ['./session-time.component.scss']
})
export class SessionTimeComponent implements OnInit, PipeTransform  {

  source:Subscription;
  dialogSub:Subscription;
  timeLeft: number;
  subscribeTimer = new BehaviorSubject<string>("");
  expirationTime: number = 0;
  constructor(public authorizationService:AuthorizationService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.expirationTime = this.authorizationService.userValue.expirationTime;
    let expirationDate = new Date(this.expirationTime);
    let currentTime = new Date();
    this.timeLeft = Math.floor((expirationDate.getTime()-currentTime.getTime())/1000);
    this.observableTimer();
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    let time;
    if(minutes<10){
      time = "0"+minutes;
    }else{
      time = minutes;
    }
    if(seconds<10){
      time = time+":0"+seconds;
    }else{
      time = time+":"+seconds;
    }
    
    return time;
 }
  
  observableTimer(){
    let time:string;
    this.source = timer(0,1000).subscribe(val=>{
      time = this.transform(this.timeLeft - val);
      this.subscribeTimer.next(time);
      switch(time){
        case "01:00":
          this.dialog.open(SessionDialogComponent , { disableClose: true });
          this.dialogSub = this.dialog.afterAllClosed.subscribe(res => {
              this.dialogSub.unsubscribe();
              this.source.unsubscribe();
              if(this.authorizationService.userValue != null){
                this.ngOnInit();
              }else{
                this.authorizationService.logout();
              }
            })
          break;
        case "00:00":
          this.source.unsubscribe();
          this.dialog.closeAll();
          this.authorizationService.logout();
          break;
      }
    })
  }
}
