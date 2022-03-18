import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  {

  @Input() isLoggedIn: boolean;
  @Output() logout: EventEmitter<boolean> = new EventEmitter<boolean>();

  onLogout(){
    this.logout.emit(true);
  }

}
