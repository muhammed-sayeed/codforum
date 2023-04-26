import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { userProfileAction } from 'src/app/store/action/userprofile';
import { isDataSelector, profileSelector } from 'src/app/store/selectors';
import { Login } from 'src/app/types/login.interface';
import { profile } from 'src/app/types/profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profile$: Observable<any>;
  pro!: profile;
  bioData!:string
  ques!:any
  answ!:any;
  Art:any

  noQns=false
qnsTrue =false
noAns=false
ansTrue = false
noArt =false
artTrue=false

  constructor(private store: Store<AppStateInterface>,
    private authService:AuthService
    ) {
    this.store.dispatch(userProfileAction())
    this.profile$ = this.store.pipe(select(profileSelector));
    this.profile$.subscribe((data) => {
      console.log('profile',data);
      
      this.pro = data;
      this.ques=data.questions
      this.answ=data.answers
      this.Art=data.comments
      this.bioData=this.pro.bio
      
   if(this.ques.length==0){
    this.noQns =true
    this.qnsTrue=false
   }else{
    this.noQns = false
    this.qnsTrue = true
   }
   if(this.answ.length==0){
    this.noAns =true
    this.ansTrue=false
   }else{
    this.noAns = false
    this.ansTrue = true
   }
   if(this.Art.length==0){
    this.noArt =true
    this.artTrue=false
   }else{
    this.noArt = false
    this.artTrue = true
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
}
