import {Component, Input, OnInit} from '@angular/core';
import {Artist, Criteria, Movie, MovieMode} from "../Models";
import {ServerService} from "../server.service";
import {ActivatedRoute, Route} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-recent-movies',
  templateUrl: './recent-and-popular-movies.component.html',
  styleUrls: ['./recent-and-popular-movies.component.css']
})
export class RecentAndPopularMoviesComponent implements OnInit {

  /*
  * This component will fetch various types of movie array (recent or popular) and use
  * poplate view using MovieListCompoment
  * */

  movies: Movie[] = [];
  currentPage = 1;
  headingText:String;
  @Input() movieMode: MovieMode = null;

  constructor(private serverService: ServerService, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit() {

    console.log(this.movieMode);

    if(this.movieMode===null)//if movie mode has not been set by parent
    this.movieMode = (this.activatedRoute.snapshot.data.mode=== MovieMode.RECENT)?MovieMode.RECENT:MovieMode.TOP_RATED;

    this.headingText = this.movieMode===MovieMode.RECENT?"Recent Releases":"Top rated";
    this.getResults();
    let win = $(window);
    if(this.activatedRoute.snapshot.data.mode!=='homepage') //dont implement infinite loading if its homepage
    win.scroll(() => {
      console.log('scroll');
      // if diff is approx 0, page botttom is reached
      let diff = $(document).height() - win.height() - win.scrollTop();
      console.log(Math.floor(diff) === 0);
      if (Math.floor(diff) === 0) {
        ++this.currentPage;
        this.getResults();
      }
    });
  }

  getResults() {
    this.serverService.getMovies(this.currentPage, this.movieMode)
      .subscribe((results: any) => {
        this.movies = [...this.movies, ...results.results.reverse()];
      });
  }


}
