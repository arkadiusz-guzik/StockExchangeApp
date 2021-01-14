import { UserDb } from './user-db';

export class StockDb {
    
    public stockId: number;
    public name: string;
    public shortcut: string;
    public number: number;
    public price: number;
    public user: UserDb;
}
