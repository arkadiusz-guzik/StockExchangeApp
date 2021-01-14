import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { SubscribedStocks } from '../models/subscribed-stocks';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subscribedStocks: SubscribedStocks = new SubscribedStocks();

  constructor() { }

  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: () => {
        if (ws.readyState === WebSocket.OPEN) {
         this.subscribedStocks.stocksList.forEach(item => ws.send(JSON.stringify({'type':'subscribe', 'symbol': item.shortcut})));
         //ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
        }
      }
    };
    
    return Subject.create(observer, observable);
  }

}

