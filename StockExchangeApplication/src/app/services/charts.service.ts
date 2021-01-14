import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { BaseUrlService } from '../models/base-url-service';
import { ChartData } from '../models/chart-data';
import { HistoryDb } from '../models/history-db';
import { WebsocketKey } from '../models/websocket-key';

const CHART_URL = "https://finnhub.io/api/v1/stock/candle";
const URL_KEY = WebsocketKey.TOKEN;

@Injectable({
  providedIn: 'root'
})
export class ChartsService extends BaseUrlService{
 
  public stockIdSubject: BehaviorSubject<number>;
  public userMoneySubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {
    super();
    this.stockIdSubject = new BehaviorSubject<number>(0);
  }

  public get stockId(): number {
    return this.stockIdSubject.value;
  }

 

  setStockId(id:number){
    this.stockIdSubject.next(id);
  }

  getChartData(symbol: string, resolution: string):Observable<ChartData>{
    let toDate = Math.round(new Date().getTime()/1000);
    
    let date = new Date();

    switch(resolution){
      case '1':
        date.setHours(date.getHours()-5);
        break;
      case '5':
        date.setDate(date.getDate()-1);
        break;
      case '15':
        date.setDate(date.getDate()-3);
        break;
      case '30':
        date.setDate(date.getDate()-8);
        break;
      case '60':
        date.setMonth(date.getMonth()-1);
        break;
      case 'D':
        date.setMonth(date.getMonth()-5);
        break;
      case 'W':
        date.setMonth(date.getMonth()-10);
        break;
    }

    
    let fromDate = Math.round(date.getTime()/1000);
    return this.httpClient.get<ChartData>(CHART_URL+"?symbol="+symbol+"&resolution="+resolution+"&from="+fromDate+"&to="+toDate+"&token="+URL_KEY);
  }

  purchaseTransaction(historyDb: HistoryDb, token:string){
    const headers = { 'Authorization': token};
    this.httpClient.post(this.baseUrl+'/purchaseTransaction', historyDb, {headers}).subscribe();
  }
  
  saleTransaction(historyDb: HistoryDb, token:string) {
    const headers = { 'Authorization': token};
    this.httpClient.post(this.baseUrl+'/saleTransaction', historyDb, {headers}).subscribe();
  }

  getLastPrice(name:string):Observable<ChartData>{
    let date = new Date();
    
    date.setDate(date.getDate()-2);
    
    let toDate = Math.round(new Date().getTime()/1000);
    let fromDate = Math.round(date.getTime()/1000);

    return this.httpClient.get<ChartData>(CHART_URL+"?symbol="+name+"&resolution=D&from="+fromDate+"&to="+toDate+"&token="+URL_KEY);
   }

  updatePrice(userId: number, token:string){
    const headers = { 'Authorization': token};
    return this.httpClient.get<number>(this.baseUrl+'/getMoney/'+userId,{headers}).subscribe(money => this.userMoneySubject.next(money));
  }

}
