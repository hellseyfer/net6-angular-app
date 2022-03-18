import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxRolesService } from 'ngx-permissions';
import { observable, Observable, Subject } from 'rxjs';
import { JWTTokenService } from './jwttoken-service.service';

@Injectable()
export class AuthService {

  baseUrl = 'https://localhost:7057/api';
  $loggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private _http: HttpClient,
              private _jwts: JWTTokenService,
              private _rs: NgxRolesService,
              private _router: Router
              ) { }

  register(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/users', obj);
  }

  login(obj): Observable<any>{
    return this._http.post(this.baseUrl + '/login', obj);
  }

  logout(){
    this._jwts.destroyToken();
    this.$loggedIn.next(false);
    this._rs.flushRoles();
    this._router.navigate(['/home'])
  }

  get $isLoggedIn(): Observable<boolean> {
    return this.$loggedIn.asObservable();
  }

  getIsLoggedIn(){
    return !this._jwts.isTokenExpired();
  }

  setIsLoggedIn(val: boolean, token?:string){
    if(token && val){
      
      this._jwts.setToken(token);
      const role = this._jwts.getRole();
      let perm = [''];
      this._rs.addRole(role, perm);
      
    }
    this.$loggedIn.next(val);
  }
}
