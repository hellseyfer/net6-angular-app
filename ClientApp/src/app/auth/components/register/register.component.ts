import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from '../../models';
import { CustomValidationService } from '../../services/custom-validation.service';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  submitted: boolean;

  @Output() registerForm: EventEmitter<UserRegister> = new EventEmitter<UserRegister>();

  // getters for easier access
 /*   get roles() {
    return this.myForm.get('roles');
  }  */
  get myFormControl() {
    return this.myForm.controls;
  }


  rolesOptions: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' },
  ];

  constructor(private fb: FormBuilder, private _cv: CustomValidationService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.minLength(4), this._cv.patternValidator('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$')])],
        password: ['', Validators.required],
        passwordRepeat: ['', Validators.required],
        name: [''],
        surname: [''],
        //roles: [undefined, Validators.required]
        rol: ['']
      },
      {
        validator: this._cv.MatchPassword('password', 'passwordRepeat'),
      }
    );
  }
 
  onSelectRol(val:string) {
    //this.roles.patchValue([val]);
  } 

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
      console.table(this.myForm.value);
      this.registerForm.emit(this.myForm.value);
    }
    
    console.log(this.findInvalidControlsRecursive(this.myForm));
    
  }

  public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
    var invalidControls:string[] = [];
    let recursiveFunc = (form:FormGroup|FormArray) => {
      Object.keys(form.controls).forEach(field => { 
        const control = form.get(field);
        if (control.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }        
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }

}
