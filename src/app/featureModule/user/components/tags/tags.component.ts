import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { tagListAction } from 'src/app/featureModule/store/actions/taglist';
import { isTagSelector } from 'src/app/featureModule/store/selectors';
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';
import { userServices } from '../../service/userservice';
import { tags } from 'src/app/coremodule/interfaces/tags.interface';
import { loadingService } from 'src/app/coremodule/services/Loader/loading.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit  {
  tags!:taglist[]
  searchControl : FormControl = new FormControl()
  value!:string

  dataLoaded = false
  constructor(
 private userService:userServices,
 private loaderService: loadingService
 ){
  }

  ngOnInit(): void {
    this.loaderService.show()
    this.userService.tagList().subscribe((data:tags)=>{
     this.tags = data.tags
     console.log(this.tags);
     this.loaderService.hide()
    })
  }
  tagSearch(event:string){
     this.value = event
  }
}
