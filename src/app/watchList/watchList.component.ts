import { Component, OnInit } from '@angular/core';
import {Movie} from "../Models";
import {HelperService} from "../helper.service";

@Component({
  selector: 'app-watch-list',
  templateUrl: './watchList.component.html',
  styleUrls: ['./watchList.component.css']
})
export class WatchListComponent implements OnInit {

  /*This component just receives watch list from helperService, reverses it and show it on
  * view using MovieListComponent
  * */
  watchList:Movie[] = [];
  constructor(private helperService:HelperService) { }

  ngOnInit() {
    this.watchList = this.helperService.getWatchList().reverse();
  }

}
