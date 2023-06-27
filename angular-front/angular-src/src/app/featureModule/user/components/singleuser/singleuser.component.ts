import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { singleUserAction } from 'src/app/featureModule/store/actions/useractions';
import { ChatServiceService } from '../singlechat/chat.service';
import { Observable } from 'rxjs';
import { isDataSelector } from 'src/app/featureModule/store/selectors';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit{ 

Id = this.router.snapshot.paramMap.get('id') as string
details:any
Qns:any
Ans:any
Art:any
bio=false
edu =false
work=false
place = false
chatModal = false

messageArray: Array<{user: String, message: String}> = [];
public isTyping = false;
message!:any
chatroom!:string
 currentUser:any 
 userEmail!:string
 mail!:string

 dataLoaded = false
 


constructor( private router:ActivatedRoute,
             private store:Store<AppStateInterface>,
             private authService:userServices,
             private chatService:ChatServiceService
  ){
   
 authService.singleUser(this.Id).subscribe((data:any)=>{
    this.details = data.profile
   console.log('details',this.details);
   this.Qns=this.details.questions
   this.Ans = this.details.answers
   this.Art = this.details.comments
   this.mail = this.details.email

   this.dataLoaded = true
})


  }

 






  ngOnInit(): void {
    let userData$:Observable<any>
    userData$ = this.store.pipe(select(isDataSelector)) 
    userData$.subscribe(data=>{
      this.currentUser = data
     console.log('CURRENTUSER',this.currentUser);
     this.userEmail = this.currentUser.email
    })
  }
 
  



}

