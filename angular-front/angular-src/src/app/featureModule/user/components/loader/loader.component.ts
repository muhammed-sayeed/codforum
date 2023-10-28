import { Component, OnInit } from '@angular/core';
import { loadingService } from 'src/app/coremodule/services/Loader/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading!:boolean
    
  constructor(
  private loaderService:loadingService
  ){}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((load)=>{
      this.isLoading = load
    })
  }
}
