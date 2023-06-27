import { Component, ElementRef, ViewChild ,AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill'
import Swal from 'sweetalert2';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-askqn',
  templateUrl: './askqn.component.html',
  styleUrls: ['./askqn.component.css']
})
export class AskqnComponent implements AfterViewInit,OnInit{
 tagList:any
 highligted =false
 Name!:string
 tagname:string[] = []
 qnTags :string[]= []
   ContentHtml:any
  Content!:string
  visibility=false
  editorVisibility=false
  editor!:any
  editorContent!:any
 @ViewChild('editor') editorRef!:ElementRef
  @ViewChild('textBox') textBox !:ElementRef<HTMLDivElement>

  constructor(
    private authService:userServices,
    private router:Router){
    authService.tagForQn().subscribe((data:any)=>{
      this.tagList=data.tags
      console.log(this.tagList);
      
    })
  }

  next(){
  this.ContentHtml = this.textBox.nativeElement.innerHTML;
  this.Content = this.textBox.nativeElement.innerText
if(this.Content == ''){
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
    title: 'Complete title section'
  })
}else{
  this.editorVisibility=true
}

  }

  ngOnInit(): void {
    
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
        title: 'Complete Detail section'
      })
    }else{
           
      this.visibility = true
    }
  
  }

  apply(){
    if(this.qnTags.length == 0){
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
        title: 'Please select Tags'
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
      let v :string =   this.ContentHtml
      console.log(v,'html');
      
      const qns = {
        CHtml:v,
        Content:this.Content,
        editorContent:this.editorContent,
        tags:this.qnTags
      }
      this.authService.addQn(qns).subscribe((data:any)=>{
  console.log(data);
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
 setTimeout(()=>{
  this.router.navigate(['/'])
 },3000)
    }
      })
    }

  }

  tagSelected(Id:string,name:string,event:any){
   
    this.qnTags.push(Id)
    console.log(this.qnTags);
    this.Name =name
    this.tagname.push(this.Name)
    event.target.disabled = true
  }
}
