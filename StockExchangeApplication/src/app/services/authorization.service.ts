import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseUrlService } from '../models/base-url-service';
import { UserDb } from '../models/user-db';
import { UserDto } from '../models/user-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends BaseUrlService{

  public userSubject: BehaviorSubject<UserDto>;
  public user: Observable<UserDto>;

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
    this.userSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserDto {
    return this.userSubject.value;
  }

  sendAuthorization(username:string, password:string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let theParams = new HttpParams().set("username",username).set("password", password);
    return this.httpClient.post<UserDto>(this.baseUrl+'/authorization',headers, {params: theParams}).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));

  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

}
