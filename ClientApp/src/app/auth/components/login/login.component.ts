import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  submitted: boolean;

  @Output() loginForm: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  onSubmit(){
    this.submitted = true;
    if (this.myForm.valid) {
      console.table(this.myForm.value);
      this.loginForm.emit(this.myForm.value);
    }
  }


}
