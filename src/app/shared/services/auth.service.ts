import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthResult, User, UserType } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = "app-auth-token";
  private userKey = "app-user-info";

  private baseAddress = "http://localhost:3000";//in real app get from configuration instead of hardcoding

  private urlConfig = {
    login: 'login',
    register: 'register'
  }

  public login(email: string, password: string){
    return this.http.post<AuthResult>(this.urlConfig.login, { email, password }).pipe(tap(c => {
      this.setToken(c.accessToken);
      this.setUserInfo(c.user);
    }));
  }

  public logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  public register(email: string, password: string, userType: UserType){
    return this.http.post(this.urlConfig.register, { email, password, userType });
  }




  public getToken(){
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }

  public setUserInfo(user: User){
    localStorage.setItem(this.userKey, JSON.stringify(user))
  }

  public getUserInfo(){
    return localStorage.getItem(this.userKey) != null ? JSON.parse(localStorage.getItem(this.userKey)!) : null;
  }

  public isUserSignedIn(){
    let token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    let key: keyof (typeof this.urlConfig);

    for(key in this.urlConfig)
    {
      this.urlConfig[key] = this.baseAddress + '/' + this.urlConfig[key];
    }
  }
}
