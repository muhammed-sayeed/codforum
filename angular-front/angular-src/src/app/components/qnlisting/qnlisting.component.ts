import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { tagQnAction } from 'src/app/store2/actions/tagqn';


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
    authServices:AuthService
  ){
    authServices.tagQn(this.tagId).subscribe((data:any)=>{
   
      this.Qn=data.qnlist
    })
  }
  ngOnInit(): void {
    
  }
}
