import { Component ,OnInit,ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatServiceService } from './chat.service';
import { Observable } from 'rxjs';
import { isDataSelector } from 'src/app/featureModule/store/selectors';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import moment from 'moment';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.css']
})
export class SinglechatComponent implements OnInit{
  usermail = this.router.snapshot.paramMap.get('mail') as string
  mail = this.router.snapshot.paramMap.get('usermail') as string

  messageArray: Array<{user: String, message: String,messageTime:Date}> = [];
  public isTyping = false;
Id!:string
message!:any
chatroom!:string
 currentUser:any 
details:any


  constructor(
    private authService:userServices,
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

       if ( this.usermail < this.mail) {
        this.chatroom = this.usermail.concat(this.mail);
      } else {
        this.chatroom = this.mail.concat(this.usermail);
      }
      this.chatService.joinRoom({user:this.usermail, room: this.chatroom});
    this.chatService.getChatRoomsChat(this.chatroom).subscribe((messages:any) => {
      if(messages.data){
        this.messageArray = messages.data
        this.scrollToBottom()
       
        
      }
       
      });
    })
       

    })
      this.chatService.newMessageReceived().subscribe(data => {
        this.messageArray = [...this.messageArray,data]
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


   
    if ( this.usermail < this.mail) {
      this.chatroom = this.usermail.concat(this.mail);
    } else {
      this.chatroom = this.mail.concat(this.usermail);
    }
    console.log(this.chatroom,'chatroom joiined');
    
    this.chatService.joinRoom({user:this.usermail, room: this.chatroom});
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
    this.chatService.typing({room: this.chatroom, user: this.usermail});
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
