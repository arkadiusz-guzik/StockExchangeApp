import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { BaseUrlService } from '../models/base-url-service';
import { StockDb } from '../models/stock-db';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends BaseUrlService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  getListOfStock(userId: number, token:string):Observable<StockDb[]>{
    const stockListUrl = `${this.baseUrl}/portfolioStockList/${userId}`;
    const headers = { 'Authorization': token};

    return this.httpClient.get<StockDb[]>(stockListUrl, { headers });
  }

}
