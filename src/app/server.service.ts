import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppVariablesService} from "./appVariables.service";
import {MovieMode, User} from "./Models";
import * as fakeUsersData from './fakeDB.json';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ServerService {


  resultsArrivedEventEmitter:EventEmitter<any> = new EventEmitter<any>();
  makeNewReqObservable:EventEmitter<any> = new EventEmitter<any>();
  getReqObservable;
  MOVIE_DB_API_KEY:String;

  constructor(private httpClient:HttpClient, private appVariablesService:AppVariablesService) {
    this.MOVIE_DB_API_KEY = this.appVariablesService.MOVIE_DB_API_KEY;
  }

  makeGetRequest(searchMode,keyword,page){
    let url = `https://api.themoviedb.org/3/search/${searchMode}?api_key=${this.MOVIE_DB_API_KEY}&query=${keyword}&page=${page}`;
    return this.getReqObservable = this.httpClient.get(url);
  }
  searchMoviesForArtistID(id){
    let url = `https://api.themoviedb.org/3/person/${id}?api_key=${this.MOVIE_DB_API_KEY}&append_to_response=credits`;
    return this.getReqObservable = this.httpClient.get(url);
  }

  getLatestMovies(page=1){
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
    return this.getReqObservable = this.httpClient.get(url);
  }
  getMovies(page=1,mode:MovieMode){
    let url;
    if(mode===MovieMode.RECENT)
    url = `https://api.themoviedb.org/3/movie/upcoming?api_key=7f148f6061d6b81c3745e3bb8b0cbd33&language=en-US&page=${page}`;
    else {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
    }
    return this.getReqObservable = this.httpClient.get(url);
  }
  getCastAndCrewOfMovieByID(id){
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.MOVIE_DB_API_KEY}&append_to_response=credits`;
    return this.getReqObservable = this.httpClient.get(url);
  }
  getTopRatedMovies(page=1){
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.MOVIE_DB_API_KEY}&language=en-US&page=${page}`;
    return this.getReqObservable = this.httpClient.get(url);
  }

  login(user:User){
    console.info('starting sign in');
    /*make database request*/
    return Observable.create((observer)=> {
      let isUserDetailsCorrect:boolean = this.makeDBReq(user);
      observer.next(isUserDetailsCorrect);
    });
  }
  makeDBReq(user:User):boolean{
    let fakeUsers:any = (<any>fakeUsersData);
    for(let i=0;i<fakeUsers.length;++i){
      if(user.userEmail===fakeUsers[i].userEmail && user.userPassword === fakeUsers[i].userPassword){
        return true;
      }
    }
    return false;
  }

}
