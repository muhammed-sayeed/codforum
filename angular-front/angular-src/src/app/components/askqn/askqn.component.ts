import { Component, ElementRef, ViewChild ,AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill'
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService:AuthService,private router:Router){
    authService.tagForQn().subscribe((data:any)=>{
      this.tagList=data.tags
      console.log(this.tagList);
      
    })
  }

  next(){
  this.ContentHtml = this.textBox.nativeElement.innerHTML;
  this.Content = this.textBox.nativeElement.innerText
 console.log(this.ContentHtml);
 this.editorVisibility=true
   this.authService.checkQn(this.Content).subscribe((data)=>{

   })
  
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
   console.log(this.editorContent);
   this.visibility = true
  }

  apply(){
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
this.router.navigate(['/'])
  }
    })
  }

  tagSelected(Id:string,name:string){
   
    this.qnTags.push(Id)
    console.log(this.qnTags);
    this.Name =name
    this.tagname.push(this.Name)
  }
}
