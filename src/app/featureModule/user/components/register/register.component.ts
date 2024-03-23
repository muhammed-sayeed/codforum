import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { Observable} from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
 
import { registerAction } from 'src/app/featureModule/store/actions/register.action';

import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { registerRequestInterface } from 'src/app/coremodule/interfaces/registerrequest.interface';
import { authStateInterface } from 'src/app/coremodule/interfaces/state.interface';
import { isLodingSelector } from 'src/app/featureModule/store/selectors';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 pageLoding$:Observable<boolean>
 username!:string;
 email!:string;
 phone!:number;
 password!:string

 err:string|undefined

 registerForm!: FormGroup

 constructor(
  private store:Store<AppStateInterface>
 ){
 this.pageLoding$ = this.store.pipe(select(isLodingSelector))
}

 ngOnInit(): void {
  this.registerForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(6)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })
 
 }



 onRgisterSubmit(){
  console.log('submiting.......');
  
  if(this.registerForm.valid){
    console.log('validating.......');
    
    const user = this.registerForm.value
    this.store.dispatch(registerAction(user))
  }
 }
}
