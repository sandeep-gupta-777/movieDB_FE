import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../server.service";
import {Artist, Criteria, Movie} from "../Models";
import {HelperService} from "../helper.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  /*
  * Job of this component is to recieve Movie Array from various source and populate them in view
  * */
  @Input() movies:Movie[] = [];
  artist:Artist[];
  url_prefix = "http://image.tmdb.org/t/p/w185/";
  movie_image_placeholder = "http://via.placeholder.com/98x140";
  constructor(private serverService: ServerService,private helperService:HelperService) {
  }

  movieExistsInWatchList(movie){
    let inWatchList =  this.helperService.doesMovieExistsInWatchList(movie);
    return inWatchList? "Remove":"Add to watch list";
  }

  ngOnInit() {}
  showMovieDetails(movie:Movie){
    console.log('clicked');
    this.helperService.showMovieDetailsEvent.emit(movie);

  }
  toggleMovieInWatchList(movie:Movie){
    console.log('toggle');
  //  push to localstorage
    if(this.helperService.doesMovieExistsInWatchList(movie)){
      this.helperService.removeFromWatchList(movie);
    }
    else
    this.helperService.addToWatchList(movie);
  }

}
