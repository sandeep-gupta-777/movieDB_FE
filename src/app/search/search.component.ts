import {Component, OnInit} from '@angular/core';
import {Artist, Criteria, Movie} from "../Models";
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /*
* This component will fetch movie array based on users searches and
* populate view using MovieListComponent
* If the user searches for artists it will fetch artists and populate by itself
* */

  movies: Movie[] = [];
  showLoading: boolean = false;
  artists: Artist[] = [];
  url_prefix = "http://image.tmdb.org/t/p/w185/";
  artist_image_placeholder = "http://via.placeholder.com/185x287";
  currentPage=1;
  searchCriteria;

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    this.serverService.makeNewReqObservable.subscribe((criteria: Criteria) => {
      //A fresh search is perform.
      this.movies.length=0;
      this.artists.length=0;
      this.showLoading = true;
      this.getResults(criteria);
      this.searchCriteria = criteria;
    });

    let win = $(window);
    win.scroll(() => {
      console.log('scroll');
      // if diff is approx 0, page botttom is reached
      let diff = $(document).height() - win.height() - win.scrollTop();
      console.log(Math.floor(diff) === 0);
      if (Math.floor(diff) === 0) {
        ++this.currentPage;
        this.showLoading = true;
        this.getResults(this.searchCriteria);
      }
    });
  }

  getResults(criteria: Criteria) {
    this.serverService.makeGetRequest(criteria.search_mode, criteria.keyword,this.currentPage)
      .subscribe((results: any) => {
        console.log(results);
        if (criteria.search_mode === 'movie') {
          this.movies = [...this.movies,...results.results];
          this.artists.length = 0;
        }
        else {
          this.artists = [...this.artists, results.results];
          this.movies.length = 0;
        }
        this.showLoading = false;

      })
  }

  searchMoviesForArtist(artist: Artist) {
    this.showLoading = true;
    this.serverService.searchMoviesForArtistID(artist.id)
      .subscribe((result: any) => {
        this.movies = result.credits.cast;
        this.artists.length = 0;
        console.log(this.movies);
        this.showLoading = false;
      });
  }
}
