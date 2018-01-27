import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {Movie, MovieMode} from "../Models";
import {RecentAndPopularMoviesComponent} from "../recent-movies/recent-and-popular-movies.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  /*
  * This component is a wrapper for:
  * 1. RecentAndPopularMoviesComponent with mode = Recent Releases
  * 2. RecentAndPopularMoviesComponent with mode = Top rated
  * */
  recentMode:MovieMode = MovieMode.RECENT;
  topRatedMode:MovieMode = MovieMode.TOP_RATED;

  constructor(private serverService:ServerService) {
  }

  ngOnInit() {
    console.log(this.recentMode,this.topRatedMode);
  }

}
