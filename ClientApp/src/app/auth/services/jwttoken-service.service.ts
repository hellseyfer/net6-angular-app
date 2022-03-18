import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable()
export class JWTTokenService {

    //jwtToken: string;
    decodedToken: { [key: string]: string };

    constructor() {
    }

    setToken(token: string) {
      if (token) {
        //this.jwtToken = token;
        localStorage.setItem('token', JSON.stringify(token));
      }
    }

    getToken(){
      return JSON.parse(localStorage.getItem('token'));
    }

    destroyToken(){
      localStorage.removeItem('token');
    }

    decodeToken() {
      const t = this.getToken()
      if (t) {
      this.decodedToken = jwt_decode(t);
      }
    }

    getDecodeToken() {
      return jwt_decode(this.getToken());
    }

    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.userdata : null;
    }

  /*   getEmailId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.email : null;
    } */

    getRole() {
      this.decodeToken();
      const str_role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      const r = this.decodedToken ? this.decodedToken[str_role] : null;
      return r
    } 

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: any = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return true;
      }
    }
}