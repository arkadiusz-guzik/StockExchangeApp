import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlService } from '../models/base-url-service';
import { HistoryDb } from '../models/history-db';

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends BaseUrlService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  getListOfStock(userId: number, token:string):Observable<HistoryDb[]>{
    const stockListUrl = `${this.baseUrl}/historyStockList/${userId}`;
    const headers = { 'Authorization': token};
    return this.httpClient.get<HistoryDb[]>(stockListUrl, {headers});
  }

  searchStock(userId: number, value: string, token:string):Observable<HistoryDb[]>{
    const stockListUrl = `${this.baseUrl}/historyStockList/${userId}/${value}`;
    const headers = { 'Authorization': token};
    return this.httpClient.get<HistoryDb[]>(stockListUrl, {headers});
  }
}
