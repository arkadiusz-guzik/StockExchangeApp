export class UserDb {
    
    public userId: number;
    public username: string;
    private password: string;
    private email: string;
    public money: number;


    constructor(username?:string, password?: string, email?: string){
        this.userId = 0;
        this.username = username || '';
        this.password = password || '';
        
    }

    public get getUserId(){
        return this.userId;
    }
}
