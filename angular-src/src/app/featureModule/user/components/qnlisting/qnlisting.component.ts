import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { userServices } from '../../service/userservice';
import { qnList } from 'src/app/coremodule/interfaces/qnList.interface';


@Component({
  selector: 'app-qnlisting',
  templateUrl: './qnlisting.component.html',
  styleUrls: ['./qnlisting.component.css']
})
export class QnlistingComponent implements OnInit {
  Qn!:qnList[]
 tagId = this.router.snapshot.paramMap.get('id') as string
  constructor(
    private router:ActivatedRoute,
    private store:Store,
    authServices:userServices
  ){
    authServices.tagQn(this.tagId).subscribe((data:{qnlist:[]})=>{
   
      this.Qn=data.qnlist
    })
  }
  ngOnInit(): void {
    
  }
}
