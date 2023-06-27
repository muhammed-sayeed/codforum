import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { userProfileAction } from 'src/app/featureModule/store/actions/userprofile';
import { isDataSelector, profileSelector } from 'src/app/featureModule/store/selectors';
import { Login } from 'src/app/coremodule/interfaces/login.interface';
import { profile } from 'src/app/coremodule/interfaces/profile.interface';

import Swal from 'sweetalert2';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<any>;
  pro!: profile;
  bioData!:string
  ques!:any
  answ!:any;
  Art:any

  showAns = false
  showQn = false
  showArt = false
  dataLoaded =false
  

 

  constructor(private store: Store<AppStateInterface>,
    private authService:userServices,
    private router:Router
    ) {
   
  }
  ngOnInit(): void {
    this.store.dispatch(userProfileAction())
    this.profile$ = this.store.pipe(select(profileSelector));
    this.profile$.subscribe((data) => {
      console.log('profile',data);
      
      this.pro = data;
      this.ques=data.questions
      this.answ=data.answers
      this.Art=data.comments
      this.bioData=this.pro.bio
      
      this.dataLoaded  = true

      if(this.Art.length>0){
        this.showArt = true
      }
      if(this.answ.length>0){
        this.showAns = true
      }
      if(this.ques.length>0){
        this.showQn = true
      }
    });
  }

  updateImg(event:any,Id:string){
    const data = new FormData()
    const image = event.target.files[0]
    data.append('img',image)
    data.append('id',Id)
    this.authService.imgUpdate(data).subscribe((data)=>{
      this.store.dispatch(userProfileAction())
    }
  
    )
  }
  logout(){Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes,Do it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.userLogout()
      this.router.navigate(['/login'])
    }
  })
  
  }
}
