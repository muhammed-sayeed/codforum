import { Component,OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { userListAction } from 'src/app/store/action/userlist.action';
import { isAllDataSelector } from 'src/app/store/selectors';
import { myState } from 'src/app/types/userlist.interface';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  list!:myState[]
 userData$:Observable<myState[]>
  constructor(
    private store:Store<AppStateInterface>,
    private authService:AuthService,
    private action$ : Actions
  ){
    this.userData$ = this.store.pipe(select(isAllDataSelector))
  }

  ngOnInit(): void {
    this.userData$.subscribe({next:(data)=>{
      this.list=data;
    }})
  }

  

  userManage(access:boolean,Id:string){
 this.authService.manageUser(access,Id).subscribe((data)=>{
  this.store.dispatch(userListAction())

 })
  }
}
