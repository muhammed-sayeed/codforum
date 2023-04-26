import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store,select } from '@ngrx/store';
import { Observable} from 'rxjs'
 
import { registerAction } from 'src/app/store/action/register.action';

import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { registerRequestInterface } from 'src/app/types/registerrequest.interface';
import { authStateInterface } from 'src/app/types/state.interface';
import { isLodingSelector } from 'src/app/store/selectors';


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
