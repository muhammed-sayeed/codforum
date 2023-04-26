import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { usersAction } from 'src/app/store/action/useractions';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersDeatails: any;
  details:any
  badgeCount!:number
  searchControl : FormControl = new FormControl()
  result = []

  constructor(
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {
    this.authService.users().subscribe((data: any) => {
      this.usersDeatails = data.users;
      this.details = data.users
    });
  }
  ngOnInit(): void {
    // this.store.dispatch(usersAction())

    this.searchControl.valueChanges.pipe(debounceTime(1000),(switchMap(val =>{
      return this.authService.searchUser(val)
    }))).subscribe((data:any)=>{
      const users = data.userdetails
      this.usersDeatails = users
    })
  }

  allUsers(){
    this.authService.users().subscribe((data: any) => {
      this.usersDeatails = data.users;
      this.details = data.users
    });
  }
  normalUsers(){
  const users = this.details.filter((X:any)=>{
   return X.category == 'user'
  })
  this.usersDeatails = users
  }

  moderators(){
 const moderators = this.details.filter((X:any)=>{
  return X.category == 'moderator'
 })
 this.usersDeatails = moderators
  }
}
