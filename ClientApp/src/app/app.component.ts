import { Component } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { AuthService } from './auth/services/auth.service';
import { JWTTokenService } from './auth/services/jwttoken-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isLoggedIn: boolean;

  constructor(private _aus: AuthService,
      private _jws: JWTTokenService) { }

  ngOnInit(): void {
    this._aus.$isLoggedIn.subscribe(res => this.isLoggedIn = res);
    this._aus.setIsLoggedIn(this._aus.getIsLoggedIn(), this._jws.getToken());
  }

  onLogout(){
    this._aus.logout();
  }
}
