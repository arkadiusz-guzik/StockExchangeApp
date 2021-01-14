import { UserDb } from './user-db';

export class HistoryDb {
    
    private historyId: number;
    private date: string;
    private action: string;
    private name: string;
    private shortcut: string;
    private price: number;
    private number: number;
    private totalPrice: number;
    public accountBalance: number;
    private user: UserDb;

    constructor(date: string, action: string, name: string, shortcut: string, price: number, number: number, accountBalance: number, userId:number){
        this.historyId = 0;
        this.date = date;
        this.action = action;
        this.name = name;
        this.shortcut = shortcut;
        this.price = price;
        this.number = number;
        this.totalPrice = price * number;
        this.accountBalance = accountBalance;
        this.user = new UserDb();
        this.user.userId = userId;
    }

}
