import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store,select} from '@ngrx/store'

import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { loginAction } from 'src/app/store/action/login.action';
import { isErrorSelector, isLodingSelector } from 'src/app/store/selectors';

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
  error$!:Observable<any>

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
      console.log(this.err,'err');
      if(this.err){
        console.log("lo");
        
     
      }
      // setTimeout(() => {
      //   this.err=null
      // }, 2000);
      
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
