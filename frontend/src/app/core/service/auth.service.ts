import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../auth/login/user';
 const httpoptions = {
    headers: new HttpHeaders
      (
        {
          'Content-Type': 'application/json'
        })
  }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseAPI=environment.baseURL

  constructor(private _http:HttpClient) { }

  loginService(user:User):Observable<User>{
  return  this._http.post<User>(this.baseAPI+'/user/login',user,httpoptions)
  }
  registerService(user:User):Observable<User>{
    return  this._http.post<User>(this.baseAPI+'/user/register',user,httpoptions)
    }
  userService():Observable<any>{
    return  this._http.get<any>(this.baseAPI+'/users')
    }
//   logOutService():Observable<User>{
//  return this._http.delete<User>(this.baseAPI+'/login')
//   }
  isLoggin(): boolean{
    const user= localStorage.getItem('userId');
    return user!= null ? true : false;
  }

}
