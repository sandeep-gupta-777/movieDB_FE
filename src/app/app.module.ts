import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {Route, Router, RouterModule} from "@angular/router";
import {NotfoundComponent} from "./notfound/notfound.component";
import { HeaderComponent } from './header/header.component';

import {AuthService} from "./auth.service";
import {ServerService} from "./server.service";
import {HelperService} from "./helper.service";
import {AppVariablesService} from "./appVariables.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { HomepageComponent } from './homepage/homepage.component';

import { MovieListComponent } from './movie-list/movie-list.component';
import { RecentAndPopularMoviesComponent } from './recent-movies/recent-and-popular-movies.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WatchListComponent } from './watchList/watchList.component';
import {Movie, MovieMode} from "./Models";

const routes:Route[] = [
  {path:'login', component: LoginComponent},
  {path:'recent', component: RecentAndPopularMoviesComponent, data: { mode: MovieMode.RECENT }},
  {path:'top-rated', component: RecentAndPopularMoviesComponent, data: { mode: MovieMode.TOP_RATED }},
  {path:'search', component: SearchComponent},
  {path:'watchlist', component: WatchListComponent},

  {path:'', component: HomepageComponent, data: { mode: "homepage" }},
  {path:'**', component: NotfoundComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,


    HomepageComponent,
    LoginComponent,
    HeaderComponent,
    MovieListComponent,
    RecentAndPopularMoviesComponent,
    SearchComponent,
    MovieDetailComponent,
    SearchBarComponent,
    WatchListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    ServerService,
    HelperService,
    AppVariablesService
  ],
  bootstrap: [
    AppComponent

  ]
})
export class AppModule { }
