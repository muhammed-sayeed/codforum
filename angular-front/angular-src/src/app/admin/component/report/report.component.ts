import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { getQn } from 'src/app/types/questionss.interface';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
 Qns!:any
 newQns!:any
 repoModal=false
 reported =false
 qnsTrue=false
 noqnsTrue=false
 noansTrue=false
 ansTrue=false
 repTrue=false
 overview=true
 singleQn:any
 answers:any
 reports:any
 comments:any
  constructor(
    private authService:AuthService,
    private router:Router
  ){
    
  }
  ngOnInit(): void {
    this.authService.reportQns().subscribe((data:any)=>{
      console.log(data);
      
       this.Qns=data.questions
       
     })
  }

  reportModalShow(Id:string){
    this.repoModal=!this.repoModal
    this.authService.singleReport(Id).subscribe((data:any)=>{
     
      
     this.singleQn=data.question
      this.answers=data.answers
      this.reports=data.reports
      this.comments=data.comments
    })
}
cancelModalShow(){
  this.repoModal=!this.repoModal
}
showQ(){
  if(this.answers.length==0){
    this.noqnsTrue = true
    this.qnsTrue=!this.qnsTrue
    this.ansTrue=false
    this.repTrue=false
    this.overview=!this.overview
    this.noansTrue=false
  }else{
    this.qnsTrue=!this.qnsTrue
    this.ansTrue=false
    this.repTrue=false
    this.overview=!this.overview
    this.noansTrue=false
  }
 
}
showA(){
  if(this.comments.length==0){
    this.noansTrue=true
    this.ansTrue=!this.ansTrue
    this.qnsTrue=false
    this.repTrue=false
    this.overview=false
    this.noqnsTrue=false
  }else{
    this.ansTrue=!this.ansTrue
    this.qnsTrue=false
    this.repTrue=false
    this.overview=false
    this.noqnsTrue=false
  }
 
}
showR(){
  this.repTrue=!this.repTrue
  this.qnsTrue=false
  this.ansTrue=false
  this.overview=false
  this.noansTrue=false
  this.noqnsTrue=false
}
  qnBlocked(Id:string){
    Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Block it!'
}).then((result) => {
  if (result.isConfirmed) {
    this.authService.blockQn(Id).subscribe((data:any)=>{
      if(data.success){
        Swal.fire(
          'Blocked!',
          'This question is Blocked.',
          'success'
        )
        this.repoModal=!this.repoModal
     this.newQns =   this.Qns.filter((el:any)=>{
             return el._id != Id
        })
        this.Qns=this.newQns
      }
        
      })
   
  }
})
   
  }
}
