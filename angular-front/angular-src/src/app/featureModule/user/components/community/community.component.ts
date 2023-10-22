import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { communityListAction } from 'src/app/featureModule/store/actions/community';
import { communitySelector } from 'src/app/featureModule/store/selectors';
import { communityList } from 'src/app/coremodule/interfaces/community.interface';
import { userServices } from '../../service/userservice';
import { communities } from 'src/app/coremodule/interfaces/communities.interface';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
 dataLoaded=false
  list!:communityList[]
  searchControl : FormControl = new FormControl()

  constructor( private userService:userServices){}

  ngOnInit(): void {
    this.userService.communityList().subscribe((data:communities)=>{
     this.list = data.community
     this.dataLoaded = true
    })
  }
}
