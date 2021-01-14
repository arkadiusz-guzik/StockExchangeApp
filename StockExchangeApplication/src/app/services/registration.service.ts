import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseUrlService } from '../models/base-url-service';
import { UserDb } from '../models/user-db';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseUrlService {

  private resultSubject: BehaviorSubject<boolean>;
  private result: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    super();
    this.resultSubject = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('result')));
    this.result = this.resultSubject.asObservable();
  }

  public get resultValue(): boolean {
    return this.resultSubject.value;
  }

  sendRegistration(newUser:UserDb){
     return this.httpClient.post<boolean>(this.baseUrl+'/registration', newUser).pipe(map(result => {
      this.resultSubject.next(result);
      return result;
    }));
  }

}
