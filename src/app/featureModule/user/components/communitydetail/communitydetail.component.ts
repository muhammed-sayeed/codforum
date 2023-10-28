import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleType } from 'src/app/coremodule/interfaces/artcle';
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';

import Swal from 'sweetalert2';
import { userServices } from '../../service/userservice';
import { successState } from 'src/app/coremodule/interfaces/success.interface';
import { communityDetails } from 'src/app/coremodule/interfaces/communitydetail.interface';
import { singleCommunity } from 'src/app/coremodule/interfaces/singleCommunity.interface';
import { qnForcommunity } from 'src/app/coremodule/interfaces/qnForcommunity.interface';

@Component({
  selector: 'app-communitydetail',
  templateUrl: './communitydetail.component.html',
  styleUrls: ['./communitydetail.component.css'],
})
export class CommunitydetailComponent implements OnInit {
  Qn!: qnForcommunity[];
  show = true;
  show2 = false;
  articleModal = false;

  dataLoaded =false

  Modal = false;
  articleApproval = false;
  event = false;
  isModerator!: boolean;
  isMember!: boolean
  visibleArt: articleType[] = [];
  invisibleArt: articleType[] = [];
  community!: singleCommunity;
  tags!: taglist[];
  join = false;

  value! :string|null

  Id = this.router.snapshot.paramMap.get('id') as string;

  constructor(
    private authService: userServices,
    private router: ActivatedRoute,
    private store: Store
  ) {
   
  }
  ngOnInit(): void {
    this.authService.communityDetails(this.Id).subscribe((data:communityDetails) => {
      this.community = data.community;
      this.tags = data.community.tags;
      this.Qn = data.questions;
      this.isModerator = data.userType;
      this.visibleArt = data.visibleArt;
      this.invisibleArt = data.inVisibleArt;
      console.log(this.visibleArt);
      this.isMember= data.isMember

      this.dataLoaded = true
     
      if(this.isMember){
        let button = document.getElementById('join');
          button?.classList.remove('bg-green-500');
          button?.classList.add('bg-red-400');
          if (button?.innerHTML) button.innerHTML = 'Joined';
      }
    });
   
    
   
  }
  Join(Id: string) {
    this.authService.joinCommunity(Id).subscribe((data: successState) => {
      console.log(data,'detaaaiils');
      if (data.success) {
        this.value = 'successfully joined'
        let button = document.getElementById('join');
        button?.classList.remove('bg-green-500');
        button?.classList.add('bg-red-400');
        if (button?.innerHTML) button.innerHTML = 'Joined';
      } else if (data.success == false) {
        this.value = 'successfully removed'
        let button = document.getElementById('join');
        button?.classList.remove('bg-red-400');
        button?.classList.add('bg-green-500');
        if (button?.innerHTML) button.innerHTML = 'Join';
      }
    });
  }
  action() {
    this.show = true;
    this.show2 = false;
  }
  action2() {
    this.show2 = true;
    this.show = false;
  }

  approval() {
    this.articleApproval = !this.articleApproval;
  }

  eventModal() {
    this.Modal = !this.Modal;
  }
  modalEvent() {
    this.event = !this.event;
  }
  articleModalShow() {
    this.articleModal = !this.articleModal;
  }
  articleSubmit(Id: string) {
    console.log(Id);

    this.authService.submitArticle(Id).subscribe((data: successState) => {
     if(data.success){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Approved'
      })
     }
    });
  }
  articleReject(Id: string) {
    this.authService.rejectArticle(Id).subscribe((data: successState) => {
     if(data.success){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'Rejected'
      })
     }
    });
  }
}
