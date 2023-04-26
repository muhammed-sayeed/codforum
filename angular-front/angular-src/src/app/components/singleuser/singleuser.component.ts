import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { singleUserAction } from 'src/app/store/action/useractions';
import { ChatServiceService } from '../singlechat/chat.service';
import { Observable } from 'rxjs';
import { isDataSelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';

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
 


constructor( private router:ActivatedRoute,
             private store:Store<AppStateInterface>,
             private authService:AuthService,
             private chatService:ChatServiceService
  ){
   
 authService.singleUser(this.Id).subscribe((data:any)=>{
    this.details = data.profile
   console.log('details',this.details);
   this.Qns=this.details.questions
   this.Ans = this.details.answers
   this.Art = this.details.comments
})


// authService.singleUser(this.Id).subscribe((data:any)=>{
//   this.details = data.profile
//   console.log(data);
//   console.log('detailss',this.details);
let userData$:Observable<any> 
userData$ = this.store.pipe(select(isDataSelector)) 
userData$.subscribe(data=>{
  this.currentUser = data
 console.log('CURRENTUSER',this.currentUser);

 if ( this.currentUser.email < this.details.email) {
  this.chatroom = this.currentUser.email.concat(this.details.email);
} else {
  this.chatroom = this.details.email.concat(this.currentUser.email);
}
this.chatService.joinRoom({user:this.currentUser.email, room: this.chatroom});
this.chatService.getChatRoomsChat(this.chatroom).subscribe((messages:any) => {
if(messages.data){
  this.messageArray = messages.data
  console.log('1111',this.messageArray);
  
}
 
});
// })
 

})

this.chatService.newMessageReceived().subscribe(data => {
  this.messageArray = [...this.messageArray,data]
  console.log('2222',this.messageArray);
  this.isTyping = false;
});
this.chatService.receivedTyping().subscribe(bool => {
  this.isTyping = bool.isTyping;
});
console.log('length',this.messageArray.length);


}

btnClicked(){
  this.chatModal = true

}

ngOnInit() {
  let Id :any
 
 let userData$:Observable<any>
this.router.params.subscribe((id)=>{
Id = id['id']
userData$ = this.store.pipe(select(isDataSelector)) 
userData$.subscribe(data=>{
  this.currentUser = data
 
})
this.authService.singleUser(Id).subscribe((data:any)=>{
  this.details = data.profile
})


 
  if ( this.currentUser.email < this.details.email) {
    this.chatroom = this.currentUser.email.concat(this.details.email);
  } else {
    this.chatroom = this.details.email.concat(this.currentUser.email);
  }
  console.log(this.chatroom,'chatroom joiined');
  
  this.chatService.joinRoom({user:this.currentUser.email, room: this.chatroom});
  this.chatService.getChatRoomsChat(this.chatroom).subscribe((messages:any) => {
    this.messageArray = messages.data
  });
})
}


hideModal(){
  this.chatModal = false
}
sendMessage() {
  this.chatService.sendMessage({room: this.chatroom, user: this.currentUser.Id , message: this.message});
  this.message = '';
}

typing() {
  this.chatService.typing({room: this.chatroom, user: this.currentUser.email});
}
}
