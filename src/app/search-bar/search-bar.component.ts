import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  /*
  * This component instructs SearchComponent to search for movie based the
  * user inputs
  * */

  search_mode:string="movie";//person or movie
  keyword:string;
  constructor(private serverService:ServerService, private router:Router) { }

  ngOnInit() {
  }

  onKeyDown($event){
    if($event.keyCode===13){
      this.performSearch();
    }
  }
  performSearch(){
    console.info('performing search...');
    this.router.navigate(['search']);
    /*following will ask movie list component to make a new search for new keyword*/
    setTimeout(()=>{
      this.serverService.makeNewReqObservable.emit({search_mode:this.search_mode, keyword:this.keyword});
    },0);
  }

}
