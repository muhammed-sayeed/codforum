import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { singleUserAction } from 'src/app/featureModule/store/actions/useractions';
import { ChatServiceService } from '../singlechat/chat.service';
import { Observable } from 'rxjs';
import { isDataSelector } from 'src/app/featureModule/store/selectors';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { userServices } from '../../service/userservice';
import { individualUser, singProfile, singlAnswer, singlComment, singlQuestion, tag } from 'src/app/coremodule/interfaces/individualUser.interface';
import { currentUser } from 'src/app/coremodule/interfaces/currentUser.interface';
import { loadingService } from 'src/app/coremodule/services/Loader/loading.service';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit{ 

Id = this.router.snapshot.paramMap.get('id') as string
details!:singProfile
Qns!:singlQuestion[]
Ans!:singlAnswer[]
Art!:singlComment[]
tags!:tag
bio=false
edu =false
work=false
place = false
chatModal = false

messageArray: Array<{user: String, message: String}> = [];
public isTyping = false;
chatroom!:string
 currentUser!:currentUser | null 
 userEmail!:string
 mail!:string

 dataLoaded = false
 


constructor( private router:ActivatedRoute,
             private store:Store<AppStateInterface>,
             private authService:userServices,
             private chatService:ChatServiceService,
             private loaderService: loadingService
  ){
   loaderService.show()
 authService.singleUser(this.Id).subscribe((data:individualUser)=>{
    this.details = data.profile
   this.Qns=this.details.questions
   this.Ans = this.details.answers
   this.Art = this.details.comments
   this.mail = this.details.email
   loaderService.hide()
})


  }

 






  ngOnInit(): void {
    let userData$:Observable<currentUser | null>;
    userData$ = this.store.pipe(select(isDataSelector)) 
    userData$.subscribe(data=>{
      if(data){
        this.currentUser = data
       console.log('CURRENTUSER',this.currentUser);
       this.userEmail = data.email
   }
    })
  }
 
  



}

