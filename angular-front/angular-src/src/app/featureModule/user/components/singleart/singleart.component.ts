import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/coremodule/services/socket/socket.service';
import { userServices } from '../../service/userservice';
import { Art, ArtComment, singleArticle } from 'src/app/coremodule/interfaces/singleArticle.interface';

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

  dataLoaded = false

  Id = this.router.snapshot.paramMap.get('id') as string
  commentBox = false
  Article!:Art
 comments!:ArtComment[]
  constructor(
    private router:ActivatedRoute,
    private authService:userServices,
    private socket:SocketService
  ){
console.log(this.Id);

   authService.singleArt(this.Id).subscribe((data:singleArticle)=>{
    
    
     this.Article=data.Art
     this.comments=data.artComments
     console.log(this.comments);

     this.dataLoaded = true

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
