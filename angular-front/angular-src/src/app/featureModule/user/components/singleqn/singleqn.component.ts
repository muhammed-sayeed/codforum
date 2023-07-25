import { Component,AfterViewInit,ElementRef, ViewChild,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { SocketService } from 'src/app/coremodule/services/socket/socket.service';
import { comments } from 'src/app/coremodule/interfaces/comments.interface';

import Swal from 'sweetalert2';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-singleqn',
  templateUrl: './singleqn.component.html',
  styleUrls: ['./singleqn.component.css']
})
export class SingleqnComponent implements AfterViewInit,OnInit {
  commentControl= new FormGroup(
    {
      comment : new FormControl(null)
    }
  )
  newComment!:any
 Comments!:comments[]
 Modal= false
  upvoted=false
  downvoted=false
  commentBox=false
  report!:string
  ansUp = false
  ansDown = false
  ansCount!:number
ansUser!:any
  editor!:any
  Id = this.router.snapshot.paramMap.get('id') as string
 Qn!:any
 user!:any

 dataLoaded = false
 
 favoriteReason!: string;
 voteCount!:number
 ANS:any
 editorContent:any
  constructor(
    private router:ActivatedRoute,
    private authService:userServices,
    private socket:SocketService,
    private Router:Router
  ){
    
  }

  seasons: string[] = ['Rude or vulgar', 'Harassment or hate speech', 'Spam or copyright issue', 'Inappropriate listings message/category','other'];

  ngOnInit(): void {
    this.authService.singleQn(this.Id).subscribe((data:any)=>{
      console.log(data);
      
     this.Qn = data.qn
      this.user=this.Qn.user
      if(data.activity == 'upvoted'){
        this.upvoted = true
      }else if (data.activity == 'downvoted'){
        this.downvoted = true
      }

    this.voteCount = (this.Qn.upvote.length)-(this.Qn.downvote.length)
     
    this.authService.getComment(this.Id).subscribe((data:any)=>{
      console.log(data);
      this.Comments = data.comments
      this.dataLoaded = true
    })

    this.socket.connect()
    this.socket.comment.subscribe((data)=>{
      this.Comments = [...this.Comments,data]
    })

      this.fetchAnswers()
    })
    
    this.socket.connect()
    this.socket.answer.subscribe((data)=>{
      this.ANS = [...this.ANS,data]
    })
    
    
    
  }
  
  @ViewChild('editor') editorRef!:ElementRef
  
  fetchAnswers(){
    this.authService.getAns(this.Id).subscribe((data:any)=>{
      console.log('answers',data);
      
      this.ANS = data
      this.ansCount = data.length


     })
  }
  ngAfterViewInit(): void {
    const editorElem = this.editorRef.nativeElement

    this.editor = new Quill(editorElem,{
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
  
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
  
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults
          [{ 'font': [] }],
          [{ 'align': [] }],
  
          ['clean'],                                         // remove formatting button
          ['link', 'image', 'video']                         // link and image, video
        ],
        history: {
          delay: 0,
          maxStack: 500,
          userOnly: false
        }
    
      },
      theme: 'snow'
    })
  }

  submit(){
    this.editorContent = this.editor.root.innerHTML
    console.log(this.editorContent);
    
    if(this.editorContent.length < 20){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'Please Enter Answer'
      })
    }else{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
      
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'please wait'
      })
      const element ={
        answer: this.editorContent,
        qnId : this.Id
       }
       this.authService.savaAnswer(element).subscribe((data:any)=>{
          if(data.success){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Added successfully'
            })
            this.editor.root.innerHTML = ''
          }
          
       })
    }
  
 
  }
  qnUpVoted(id:string){
   this.authService.qnUpVoted(id).subscribe((data:any)=>{
    console.log(data);
    if(data.success == false){
      this.upvoted = false
      this.voteCount = this.voteCount - 1
      
    }else{
      this.upvoted = true
      this.downvoted = false
      this.voteCount = this.voteCount +1
    }
   })
  }
  qnDownVoted(id:string){
this.authService.qnDownVoted(id).subscribe((data:any)=>{
  if(data.success){
    console.log(data);
    this.downvoted = false
    this.voteCount = this.voteCount + 1
  }else{
    this.downvoted = true
    this.upvoted = false
    this.voteCount = this.voteCount - 1
  }
})
  }

  ansUpVoted(Id:string){
  this.authService.ansUpVoted(Id).subscribe((data)=>{
  console.log(data);
  this.fetchAnswers()
 
  })

  }
  ansDownVoted(Id:string){
 this.authService.ansDownVoted(Id).subscribe((data)=>{
  this.fetchAnswers()
 })
  }
  showBox(){
    console.log('hoi');
    
    this.commentBox = !this.commentBox
  }

  addComment(Id:string){
   
    
    this.newComment = this.commentControl.value
    console.log(this.newComment,'aaaasss');
    if(this.newComment.comment == null){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'Please Add something'
      })
    }else{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
      
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'please wait'
      })
      this.authService.addComment(this.newComment,Id).subscribe((data:any)=>{
        if(data.success){
            this.commentBox = false
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Added successfully'
            })
        }
      })
       
    }
  
  }
  showModal(){
    this.Modal = true
  }
  hideModal(){
    this.Modal = false
  }

  submitReport(Id:string){
    this.Modal = false
   if(this.report){
    this.favoriteReason = this.report
   }
   if(this.favoriteReason == undefined){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'warning',
      title: 'Please select one'
    })
   }else{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'warning',
      title: 'please wait'
    })
    this.authService.addReport(this.favoriteReason,Id).subscribe((data:any)=>{
     if(data.success){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Added successfully'
      })
     }
      
     })
   }
  
   
  }
 
}
