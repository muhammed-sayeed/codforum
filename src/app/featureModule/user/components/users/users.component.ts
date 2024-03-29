import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, switchMap } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { usersAction } from 'src/app/featureModule/store/actions/useractions';
import { userServices } from '../../service/userservice';
import { userFilter } from 'src/app/coremodule/interfaces/userFilter.interface';
import { loadingService } from 'src/app/coremodule/services/Loader/loading.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersDeatails!:userFilter[];
  details!:userFilter[]
  badgeCount!:number
  searchControl : FormControl = new FormControl()
  result = []

  dataLoaded = false

  constructor(
    private store: Store<AppStateInterface>,
    private authService: userServices,
    private loaderService: loadingService
  ) {
   
  }
  ngOnInit(): void {
    this.loaderService.show()
    this.authService.users().subscribe((data:{users:[]}) => {
      this.usersDeatails = data.users;
      this.details = data.users
      this.loaderService.hide()
    });
  }

  allUsers(){
    this.authService.users().subscribe((data:{users:[]}) => {
      this.usersDeatails = data.users;
      this.details = data.users
    });
  }
  normalUsers(){
  const users = this.details.filter((X:userFilter)=>{
   return X.category == 'user'
  })
  this.usersDeatails = users
  }

  moderators(){
 const moderators = this.details.filter((X:userFilter)=>{
  return X.category == 'moderator'
 })
 this.usersDeatails = moderators
  }
}
