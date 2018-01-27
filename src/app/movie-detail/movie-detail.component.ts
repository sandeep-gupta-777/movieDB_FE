import { Component, OnInit } from '@angular/core';
import {Movie} from "../Models";
import {HelperService} from "../helper.service";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie:Movie = {};
  showMovieDetailsPanel = false;
  url_prefix = "http://image.tmdb.org/t/p/w185/";
  movie_image_placeholder = "http://via.placeholder.com/98x140";
  constructor(
    private helperService:HelperService,
    private serverService:ServerService,
    ) { }

  ngOnInit() {
    this.helperService.showMovieDetailsEvent
      .subscribe((movie:Movie)=>{
        this.showMovieDetailsPanel = true;
        this.movie = movie;
        if(this.movie.id)
          this.serverService.getCastAndCrewOfMovieByID(this.movie.id)
            .subscribe((movie:Movie)=>{
              console.log(movie);
              this.movie = movie;
              this.movie.directors = this.helperService.getDirectors(movie);
            });
      });


  }

}
