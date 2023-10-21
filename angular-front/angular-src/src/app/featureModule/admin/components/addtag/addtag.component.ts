import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTagAction } from 'src/app/featureModule/store/actions/addtag';
import { NgForm, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { adminService } from '../../services/adminservice';
import { successState } from 'src/app/coremodule/interfaces/success.interface';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.css']
})
export class AddtagComponent {

  name!:string
  description!:string


  constructor(
private store:Store,
private authService:adminService,
private router:Router
  ){}


 

 addTag(){
//  this.DATA.append('name',this.name)
//  this.DATA.append('description',this.description)
const value ={
  name:this.name,
  description:this.description
}

 
//  this.store.dispatch(addTagAction({value:this.DATA}))
this.authService.addTag(value).subscribe((data:successState)=>{
  if(data.success){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })

  }
  this.router.navigate(['/admin/taglist'])
})
 }  
 

}
