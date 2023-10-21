import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tagsearch',
  templateUrl: './tagsearch.component.html',
  styleUrls: ['./tagsearch.component.css']
})
export class TagsearchComponent {

  searchData!:string


  @Output() dataEvent:EventEmitter<string> = new EventEmitter<string>

  search(){
    console.log(this.searchData,'in child');
    
    this.dataEvent.emit(this.searchData)
  }

}
