import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getQn } from 'src/app/coremodule/interfaces/questionss.interface';

import Swal from 'sweetalert2';
import { adminService } from '../../services/adminservice';
import { reportQns } from 'src/app/coremodule/interfaces/reportQns.interface';
import { reportData } from 'src/app/coremodule/interfaces/reportData.interface';
import { report } from 'src/app/coremodule/interfaces/report.interface';
import { reportedQnAns } from 'src/app/coremodule/interfaces/reportedQnAns.interface';
import { reportedQnCmnts } from 'src/app/coremodule/interfaces/reportedQnCommnts.interface';
import { reportedQn } from 'src/app/coremodule/interfaces/reportedQn.interface';
import { successState } from 'src/app/coremodule/interfaces/success.interface';
import { reportQnss } from 'src/app/coremodule/interfaces/reportQnAdminside.interface';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
 Qns!:reportQns[]
 newQns!:reportQns[]
 repoModal=false
 reported =false
 qnsTrue=false
 noqnsTrue=false
 noansTrue=false
 ansTrue=false
 repTrue=false
 overview=true
 singleQn!:reportedQn
 answers!:reportedQnAns[]
 reports!:report[]
 comments!:reportedQnCmnts[]
  constructor(
    private authService:adminService,
    private router:Router
  ){
    
  }
  ngOnInit(): void {
    this.authService.reportQns().subscribe((data:{questions:reportQns[]})=>{
      console.log(data,'reportQns')
      
          this.Qns=data.questions
           })
  }

  reportModalShow(Id:string){
    
    this.repoModal=!this.repoModal
    this.authService.singleReport(Id).subscribe((data:reportData)=>{
  console.log(data,'singleReport')
  
     
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
    this.authService.blockQn(Id).subscribe((data:successState)=>{
      if(data.success){
        Swal.fire(
          'Blocked!',
          'This question is Blocked.',
          'success'
        )
        this.repoModal=!this.repoModal
     this.newQns =   this.Qns.filter((el:reportQns)=>{
             return el._id != Id
        })
        this.Qns=this.newQns
      }
        
      })
   
  }
})
   
  }
}
