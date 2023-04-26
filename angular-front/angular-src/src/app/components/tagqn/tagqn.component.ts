
import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService:AuthService
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
