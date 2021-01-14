import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Observer } from 'rxjs';
import { CorrectTransactionComponent } from 'src/app/alerts/account/correct-transaction/correct-transaction.component';
import { WrongTransactionComponent } from 'src/app/alerts/account/wrong-transaction/wrong-transaction.component';
import { HistoryDb } from 'src/app/models/history-db';
import { SubscribedStocks } from 'src/app/models/subscribed-stocks';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ChartsService } from 'src/app/services/charts.service';
import { StockListService } from 'src/app/services/stock-list.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  value = 0;
  @Input() subscribedStocks:SubscribedStocks;
  @Input() stockId:number = 0;
  @Input() userId:number;
  @Input() stockList:StockListService;
  @Input() action:string;
  @Input() chartsService :ChartsService;
  @Input() token: string;
  private historyDb: HistoryDb;
  public money: number = 0;
  totalSum=0;

  transactionFormGroup: FormGroup;
  color:boolean;

  constructor(private formBuilder: FormBuilder,
              private datepipe: DatePipe,
              private snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.transactionFormGroup = this.formBuilder.group({
      transaction: this.formBuilder.group({
        number: new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,5}')]),
        price: ''
      })
    });
    
    if(this.action === "Buy"){
      this.color=true;
    }else{
      this.color=false;
    }
  }

  modelChangeNumber(e){
    this.value = e;
    this.totalSum = e * this.stockList.resultsList[this.stockId].data[0].p;
  }

  onSubmit(){
    let component;
    let messageAlert;
    let date = this.datepipe.transform(new Date(),'yyyy-MM-dd HH:mm:ss');
    let stockPrice = this.stockList.resultsList[this.stockId].data[0].p;
    let numberOfStock = this.transactionFormGroup.get('transaction').value.number;
    let stockName = this.subscribedStocks.stocksList[this.stockId].name;
    let stockShortcut = this.subscribedStocks.stocksList[this.stockId].shortcut;
    let balance;
    let valueOrder = stockPrice*this.transactionFormGroup.get('transaction').value.number;
    let userBalance = this.chartsService.userMoneySubject.value;
    
    if(stockPrice > 1.00 && numberOfStock > 0){
      if(this.action === "Buy" && valueOrder <= userBalance){
        this.color = true;
        balance = userBalance - (numberOfStock * stockPrice);
        this.historyDb = new HistoryDb(date, this.action, stockName, stockShortcut, stockPrice, numberOfStock, balance, this.userId);
        this.chartsService.purchaseTransaction(this.historyDb, this.token);
      }else if(this.action === "Sell"){
        balance = userBalance + (numberOfStock * stockPrice);
        this.historyDb = new HistoryDb(date, this.action, stockName, stockShortcut, stockPrice, numberOfStock, balance, this.userId);
        this.chartsService.saleTransaction(this.historyDb, this.token);
      }
      this.chartsService.userMoneySubject.next(this.historyDb.accountBalance);
      component = CorrectTransactionComponent;
      messageAlert = `${this.action} transaction confirmed!`;
    }else{
      component = WrongTransactionComponent;
      messageAlert = `${this.action} transaction failed!`;
    }
    this.openDialog(component,messageAlert);
  }

  openDialog(component, messageAlert){
    this.snackBar.openFromComponent(component, {
      duration: 2500,
      data: {
        message: messageAlert
      }
    });
  }

}
