import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store,select} from '@ngrx/store'

import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { loginAction } from 'src/app/featureModule/store/actions/login.action';
import { isErrorSelector, isLodingSelector } from 'src/app/featureModule/store/selectors';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  pageLoding$:Observable<boolean>
  email!:string
  password!:string
  err!:string| null
  error$!:Observable<string | null>

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
  private store:Store<AppStateInterface>,
  private snackBar: MatSnackBar
  ){
    this.pageLoding$ = this.store.pipe(select(isLodingSelector))
   }
ngOnInit(): void {
  
}

  onLoginSubmit(){
    const user ={
      email:this.email,
      password:this.password
     }

     this.store.dispatch(loginAction(user))

     this.error$=this.store.pipe(select(isErrorSelector))
     this.error$.subscribe((data)=>{
      console.log(data,'dataaaaaaaaaaaa');
      
      this.err=data

      
  })
 
  }
  openSnackBar() {
    this.snackBar.open(this.err??'', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'my-snack-bar'
    });
  }

}
