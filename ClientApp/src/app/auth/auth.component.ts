import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onRegister(r){
    this._auth.register(r).subscribe(res => {
      console.log(res);
      this._snackBar.open('Registering Success', 'Done');
    },(cb) => {
      this._snackBar.open(cb.error.detail, 'Done');

    })
  }

  onLogin(l){
    this._auth.login(l).subscribe(res => {
      console.log(res);
      if(res?.token){
        this._auth.setIsLoggedIn(true, res.token);
        this._snackBar.open('Login Success', 'Done');
        
        this._router.navigate(['/home']);
      }
    }, () => {
      this._snackBar.open('Wrong Password or Username', 'Done');
    });
  }

}
