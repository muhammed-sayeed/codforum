import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { userServices } from '../../service/userservice';


@Component({
  selector: 'app-qnlisting',
  templateUrl: './qnlisting.component.html',
  styleUrls: ['./qnlisting.component.css']
})
export class QnlistingComponent implements OnInit {
  Qn!:any
 tagId = this.router.snapshot.paramMap.get('id') as string
  constructor(
    private router:ActivatedRoute,
    private store:Store,
    authServices:userServices
  ){
    authServices.tagQn(this.tagId).subscribe((data:any)=>{
   
      this.Qn=data.qnlist
    })
  }
  ngOnInit(): void {
    
  }
}
