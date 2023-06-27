
import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-tagqn',
  templateUrl: './tagqn.component.html',
  styleUrls: ['./tagqn.component.css']
})
export class TagqnComponent implements OnInit {

  searchControl : FormControl = new FormControl()
  id= this.router.snapshot.paramMap.get('id') as string
  tagDetails:any
  tagQn:any
  constructor(
    private router:ActivatedRoute,
    private authService:userServices
  ){

  }
ngOnInit(): void {
  this.authService.tagBasedQn(this.id).subscribe((data:any)=>{
    console.log(data);
this.tagDetails = data.tagDetails
this.tagQn= data.tagQn
    
  })
}

}
