import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { Observable} from 'rxjs'
 
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

 constructor(
  private store:Store<AppStateInterface>
 ){
 this.pageLoding$ = this.store.pipe(select(isLodingSelector))
}

 ngOnInit(): void {
 
 }



 onRgisterSubmit(){
 
  
   const user:registerRequestInterface = {
    username:this.username,
    email:this.email,
    phone:this.phone,
    password:this.password
   }
   this.store.dispatch(registerAction(user))

 
 }
}
