import { Injectable} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Stock } from '../models/stock';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';
import { SubscribedStocks } from '../models/subscribed-stocks';
import { WebsocketKey } from '../models/websocket-key';


const TOKEN = WebsocketKey.TOKEN;
const SOCKET_URL = `wss://ws.finnhub.io?token=${TOKEN}`;


@Injectable({
  providedIn: 'root'
})
export class StockListService{

  public messages: Subject<Message>;

  private empty: Stock = new Stock();
  
  public resultsList:Array<Message> = [];

  private subscribedStocks: SubscribedStocks = new SubscribedStocks();
  static TOKEN: any;
  
  constructor(public wsService: WebsocketService){ 
    this.subscribedStocks.stocksList.forEach(item => this.resultsList.push({data: [this.empty], type: item.shortcut}));
    this.run();
  }
  
  public run(){
    this.messages = <Subject<Message>>this.wsService.connect(SOCKET_URL).pipe(map(
      (response: MessageEvent): Message => {
        let result = JSON.parse(response.data);
        
        if(result != undefined && result.type != "ping" ){
          
          for(let i=0; i<this.subscribedStocks.stocksList.length; i++){
            if(this.subscribedStocks.stocksList[i].shortcut === result.data[0].s){
              this.resultsList[i].data = result.data;
              this.resultsList[i].type = result.type;
              break;
            }
          }
        }
        return {
          data: result.dataa,
          type: result.type
        }
      }
    ));
    

    this.messages.subscribe();
    this.sendMsg(this.messages);
  }

  sendMsg(mes :any){
    setTimeout(function(){
      mes.next();
     }, 2000);
  }
}

export interface Message {
  data: [Stock];
  type: string;
}