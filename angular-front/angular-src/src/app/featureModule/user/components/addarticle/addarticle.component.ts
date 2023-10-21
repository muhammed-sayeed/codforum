import { Component,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill'
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';

import Swal from 'sweetalert2';
import { userServices } from '../../service/userservice';
import { successState } from 'src/app/coremodule/interfaces/success.interface';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddarticleComponent implements AfterViewInit {
tagname:string[]=[]
articleTags:string[]=[]
editor!:any
editorContent:any
editorVisibility = false
ContentHtml!:string
Content!:string
tagList:taglist[] =[]
tagVisibility=false
submitVisibility=false

Id = this.router.snapshot.paramMap.get('id') as string

constructor(
  private authService:userServices,
  private router:ActivatedRoute,
  private Router:Router
){
    authService.tagForArticle(this.Id).subscribe((data:{tags:[]})=>{
      console.log('data',data);
      this.tagList= data.tags
    })
}

@ViewChild('editor') editorRef!:ElementRef
@ViewChild('textBox') textBox !:ElementRef<HTMLDivElement>

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
    this.tagVisibility=true
  }
 
 }
 addTags(Id:string,name:string){
 
    let idFound = false
    for(let i=0;i<this.articleTags.length;i++){
      if(this.articleTags[i]==Id){
        this.articleTags.splice(i,1)
        idFound = true
        break;
      }else{
        idFound = false;
        
      }
     }
     if(!idFound){
        this.articleTags.push(Id)
     }

    let dataFound = false
    for(let i=0;i<this.tagname.length;i++){
      if(this.tagname[i]==name){
        this.tagname.splice(i,1)
        dataFound = true
        break;
      }else{
        dataFound = false;
       
      }
     }
     if(!dataFound){
        this.tagname.push(name)
     }
  if(this.articleTags.length>0){
    this.submitVisibility = true
  }else{
    this.submitVisibility=false
  }
 
 }

 addArticle(){
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
  const articleData={
    Header :this.Content,
    headerHtml:this.ContentHtml,
    body:this.editorContent,
    tags:this.articleTags,
    communityId:this.Id
  }
  this.authService.addArticle(articleData).subscribe((data:successState)=>{
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
        title: 'send for approval'
      })
 setTimeout(()=>{
  this.Router.navigate(['/communitydetail',this.Id])
 },3000)
    
     }
  })
 }
}
