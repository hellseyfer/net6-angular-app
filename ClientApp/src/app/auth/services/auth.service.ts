import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  baseUrl = 'https://localhost:7057/api';
  constructor(private _http: HttpClient) { }

  register(obj): Observable<any> {
    return this._http.post(this.baseUrl + '/users', obj);
  }

  login(obj): Observable<any>{
    return this._http.post(this.baseUrl + '/login', obj);
  }
}
