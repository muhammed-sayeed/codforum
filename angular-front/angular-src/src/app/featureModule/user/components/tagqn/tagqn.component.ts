
import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { userServices } from '../../service/userservice';
import { TagDetails, TagQn, TagUser, tagBasedQn } from 'src/app/coremodule/interfaces/tagBasedQn.interface';
import { loadingService } from 'src/app/coremodule/services/Loader/loading.service';

@Component({
  selector: 'app-tagqn',
  templateUrl: './tagqn.component.html',
  styleUrls: ['./tagqn.component.css']
})
export class TagqnComponent implements OnInit {

  searchControl : FormControl = new FormControl()
  id= this.router.snapshot.paramMap.get('id') as string
  tagDetails!:TagDetails
  tagQn!:TagQn[]
  constructor(
    private router:ActivatedRoute,
    private authService:userServices,
    private loaderService:loadingService
  ){

  }
ngOnInit(): void {
  this.loaderService.show()
  this.authService.tagBasedQn(this.id).subscribe((data:tagBasedQn)=>{
this.tagDetails = data.tagDetails
this.tagQn= data.tagQn
this.loaderService.hide()
    
  })
}

}
