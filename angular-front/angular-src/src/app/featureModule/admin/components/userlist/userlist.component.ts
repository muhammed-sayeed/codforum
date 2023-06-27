import { Component,OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { userListAction } from 'src/app/featureModule/store/actions/userlist.action';
import { isAllDataSelector } from 'src/app/featureModule/store/selectors';
import { myState } from 'src/app/coremodule/interfaces/userlist.interface';

import Swal from 'sweetalert2';
import { adminService } from '../../services/adminservice';

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
    private authService:adminService,
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
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  this.store.dispatch(userListAction())

 })
  }
}
