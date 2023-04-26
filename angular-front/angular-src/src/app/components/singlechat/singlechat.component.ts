import { Component ,OnInit,ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatServiceService } from './chat.service';
import { Observable } from 'rxjs';
import { isDataSelector } from 'src/app/store/selectors';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.css']
})
export class SinglechatComponent implements OnInit{

  messageArray: Array<{user: String, message: String,messageTime:Date}> = [];
  public isTyping = false;
Id!:string
message!:any
chatroom!:string
 currentUser:any 
details:any


  constructor(
    private authService:AuthService,
    private router:ActivatedRoute,
    private chatService:ChatServiceService,
    private store : Store<AppStateInterface>
  ){
    let userData$:Observable<any>
    this.Id = this.router.snapshot.paramMap.get('id') as string
    console.log(this.Id);
    
    
    authService.singleUser(this.Id).subscribe((data:any)=>{
      this.details = data.profile
      console.log(data);
      console.log('detailss',this.details);
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
        this.scrollToBottom()
       
        
      }
       
      });
    })
       

    })
      this.chatService.newMessageReceived().subscribe(data => {
        this.messageArray = [...this.messageArray,data]
        console.log('2222',this.messageArray);
        this.isTyping = false;
        this.scrollToBottom();
      });
      this.chatService.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });
     
     
     
      

 
   
      
  }

  @ViewChild('messageContainer', { static: false }) messageContainer!: ElementRef ;

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

  sendMessage() {
    this.chatService.sendMessage({room: this.chatroom, user: this.currentUser.Id , message: this.message});
    this.message = '';
    this.scrollToBottom();
  }

  typing() {
    this.chatService.typing({room: this.chatroom, user: this.currentUser.email});
  }

  messageTime(time:Date){
    return moment(time).fromNow()
  }
  scrollToBottom() {
    console.log('event',this.messageContainer.nativeElement);
    console.log(this.messageContainer.nativeElement.scrollHeight,'height77777');
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight
    },0);
  }
}
