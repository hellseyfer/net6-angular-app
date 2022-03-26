import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxRolesService } from 'ngx-permissions';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWTTokenService } from './jwttoken-service.service';

@Injectable()
export class AuthService {

  baseUrl = environment.baseURL;
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
    this.setRole('guest');
    this._router.navigate(['/home'])
  }

  get $isLoggedIn(): Observable<boolean> {
    return this.$loggedIn.asObservable();
  }

  getIsLoggedIn(): boolean{
    return !this._jwts.isTokenExpired();
  }

  setIsLoggedIn(val: boolean, token?:string){
    if(token && val){
      this._jwts.setToken(token);
      const role = this._jwts.getRole();
      this.setRole(role);
    } else{
      this.$loggedIn.next(val);
      this.setRole('guest');
    }
  }

  setRole(role){
      let perm = [''];
      this._rs.addRole(role, perm);
  }
}
