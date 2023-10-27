import { Component, ElementRef, ViewChild ,AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill'
import Swal from 'sweetalert2';
import { userServices } from '../../service/userservice';
import { successState } from 'src/app/coremodule/interfaces/success.interface';
import { tagForQn } from 'src/app/coremodule/interfaces/tagForQn.interface';
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';

@Component({
  selector: 'app-askqn',
  templateUrl: './askqn.component.html',
  styleUrls: ['./askqn.component.css']
})
export class AskqnComponent implements AfterViewInit,OnInit{
 tagList!:taglist[]
 highligted =false
 Name!:string
 tagname:string[] = []
 qnTags :string[]= []
   ContentHtml:string = ''
  // Content!:string
  value!:string
  visibility=false
  editorVisibility=false
  editor!:any
  Header!:any
  editorContent!:any
 @ViewChild('editor') editorRef!:ElementRef
 @ViewChild('header') headerRef!:ElementRef
  @ViewChild('textBox') textBox !:ElementRef<HTMLDivElement>

  constructor(
    private authService:userServices,
    private router:Router){
    authService.tagForQn().subscribe((data:{tags:[]})=>{
      
      setTimeout(()=>{
      },1000)
      this.tagList=data.tags
    })
  }

 

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const headerElem = this.headerRef.nativeElement
    this.Header = new Quill(headerElem,{
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

  next(){
    this.ContentHtml = this.Header.root.innerHTML
  if(this.ContentHtml.length < 15){
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

  submit(){
    this.editorContent = this.editor.root.innerHTML
    this.ContentHtml = this.Header.root.innerHTML
    if(this.editorContent.length < 20 || this.ContentHtml.length < 15){
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
        title: 'Complete entaire section'
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
        editorContent:this.editorContent,
        tags:this.qnTags
      }
      this.authService.addQn(qns).subscribe((data:successState)=>{
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

  tagSelected(Id:string,name:string,event:MouseEvent){
   
    this.qnTags.push(Id)
    console.log(this.qnTags);
    this.Name =name
    this.tagname.push(this.Name)
    const target = event.target as HTMLButtonElement
    target.disabled = true
  }

  tagSearch(event:string){
    this.value = event
 }
}
