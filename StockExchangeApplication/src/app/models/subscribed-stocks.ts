export class SubscribedStocks {

    public stocksList:Array<SubscribedStock> = [];

    constructor(){
        this.stocksList.push({name: 'Apple', shortcut:'AAPL'});
        this.stocksList.push({name: 'Tesla', shortcut:'TSLA'});
        this.stocksList.push({name: 'Netflix', shortcut:'NFLX'});
        this.stocksList.push({name: 'Facebook Inc.', shortcut:'FB'});
        this.stocksList.push({name: 'Twitter', shortcut:'TWTR'});
        this.stocksList.push({name: 'Amazon.com', shortcut:'AMZN'});
    }
}

interface SubscribedStock{
    name: string;
    shortcut: string;
}