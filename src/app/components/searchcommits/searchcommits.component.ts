import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-searchcommits',
  templateUrl: './searchcommits.component.html',
  styleUrls: ['./searchcommits.component.css']
})
export class SearchcommitsComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    this.search.valueChanges.
    pipe(
      debounceTime(300)
    )
    .subscribe(value => this.searchEmitter.emit(value));
  }

  search =  new FormControl('')
  @Output('search') searchEmitter = new EventEmitter<string>();

}
