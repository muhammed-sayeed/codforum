import { Component,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill'
import { AuthService } from 'src/app/services/auth.service';
import { taglist } from 'src/app/types/taglist.interface';

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
ContentHtml:any
Content!:string
tagList:taglist[] =[]
tagVisibility=false
submitVisibility=false

Id = this.router.snapshot.paramMap.get('id') as string

constructor(
  private authService:AuthService,
  private router:ActivatedRoute,
  private Router:Router
){
    authService.tagForArticle(this.Id).subscribe((data:any)=>{
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
 console.log(this.ContentHtml);
 this.editorVisibility=true
  
  
  }

submit(){
this.tagVisibility=true
  this.editorContent = this.editor.root.innerHTML
  console.log(this.editorContent);
 
 }
 addTags(Id:string,name:string,event:any){
 
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
  const articleData={
    Header :this.Content,
    headerHtml:this.ContentHtml,
    body:this.editorContent,
    tags:this.articleTags,
    communityId:this.Id
  }
  this.authService.addArticle(articleData).subscribe((data:any)=>{
    console.log(data);
     if(data.success){
     this.Router.navigate(['/communitydetail',this.Id])
     }
  })
 }
}
