import {Component, OnInit} from '@angular/core';
import {HelperService} from "../helper.service";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppVariablesService} from "../appVariables.service";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /*This component is header as well as wrapper around SearchBarComponent*/

  keyword;
  constructor(public helperService: HelperService,
              public authService: AuthService,
              private appVariablesService: AppVariablesService,
              private serverService: ServerService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
  }

  ngOnInit() {}

  isUserLoggedIn(){
    return this.authService.isUserLoggedIn();
  }
  homeClicked(){
    this.router.navigate(["/"]);
  }

  goToLoginPage() {
    this.router.navigate([this.appVariablesService.FRONTEND_LOGIN_PAGE_URL]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  };
}
