import {EventEmitter, Injectable} from '@angular/core';
import {AppVariablesService} from "./appVariables.service";
import {Movie} from "./Models";

@Injectable()
export class HelperService {

  showMovieDetailsEvent:EventEmitter<Movie> = new EventEmitter<Movie>();
  constructor(private appVariablesService:AppVariablesService) { }

  getDirectors(movie:Movie){
    let tempDirectorArray = [];
    if(movie && movie.credits && movie.credits.crew){
      movie.credits.crew.forEach(function (value) {
        if(value.department === "Directing"){
          tempDirectorArray.push(value.name);
        }
      })
    }
    return tempDirectorArray;
  }

  isLoggedIn():boolean{
    return localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id) !== null;
  }
  addToWatchList(movie:Movie){
    let watchList:Movie[] = this.getWatchList() || [];
    watchList.push(movie);
    let tempWatchListString = JSON.stringify(watchList);
    localStorage.setItem('watchList',tempWatchListString);
  }
  getWatchList(){
    return JSON.parse(localStorage.getItem('watchList')) || [];
  }
  doesMovieExistsInWatchList(movie:Movie){
    let watchList:Movie[] = this.getWatchList() || [];
    for(let i=0;i<watchList.length;++i){
      if(movie.id === watchList[i].id){
        return true;
      }
    }
    return false;
  }

  removeFromWatchList(movie:Movie){
    let watchList:Movie[] = this.getWatchList();
    watchList = watchList.filter(function (item:Movie) {
      return item.id!==movie.id;
    });
    let tempWatchListString = JSON.stringify(watchList);
    localStorage.setItem('watchList',tempWatchListString);
  }

  makeGetRequestForFaceBook(){
    alert('Not Implemented');
  }


}
