import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-singleart',
  templateUrl: './singleart.component.html',
  styleUrls: ['./singleart.component.css']
})
export class SingleartComponent {
  commentContoller = new FormGroup({
    comment: new FormControl(null)
  })
  newComment:any

  Id = this.router.snapshot.paramMap.get('id') as string
  commentBox = false
  Article:any
 comments:any
  constructor(
    private router:ActivatedRoute,
    private authService:AuthService,
    private socket:SocketService
  ){
console.log(this.Id);

   authService.singleArt(this.Id).subscribe((data:any)=>{
   
     this.Article=data.Art
     this.comments=data.artComments
     console.log(this.comments);

 socket.connect()
 socket.artComment.subscribe((data)=>{
  this.comments=[...this.comments,data]
 })     
    
   })
  }
  commentShow(){
    this.commentBox=!this.commentBox
    }
    addComment(Id:string){
      this.newComment = this.commentContoller.value
      this.authService.addArtComment(Id,this.newComment).subscribe((data)=>{
       console.log(data);
       this.commentBox=false
      })
     }
}
