import {Component, OnInit, ViewChild} from '@angular/core';
import {HelperService} from "../helper.service";
import {ActivatedRoute, Router} from "@angular/router";

import {AuthService} from "../auth.service";
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {User} from "../Models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showErrorMessage = false;
  helper_message = "";

  makeGetRequestForFaceBook(){
    this.helperService.makeGetRequestForFaceBook();
  }

  constructor(private helperService:HelperService,
              private serverService:ServerService,
              public appVariable:AppVariablesService,
              private authService:AuthService,
              private router:Router,private activatedRoute:ActivatedRoute) {
  }
  @ViewChild('f') form;

  showMessageForGivenTime(message:string, duration:number=3000){
    this.helper_message=message;
    this.showErrorMessage = true;
    setTimeout(()=>{this.showErrorMessage=false},duration);
  }

  onSubmit() {

    if(!this.form.valid){

      this.showMessageForGivenTime('Please fill all inputs correctly');
      return;
    }
    const user:User = {userEmail:this.form.value.email,userPassword:this.form.value.password};
    this.serverService.login(user)
      .subscribe(

      (value:boolean) =>{
        if(value){
          localStorage.setItem('userEmail',user.userEmail);
          this.router.navigate([this.appVariable.previousSRPURL]);
          console.info('Successfully logged in...');
        }
        else {
          this.showMessageForGivenTime("Details are not correct");
        }
      },
      (error )=> {

        console.log(error);//TODO improve error.error
        this.showMessageForGivenTime(error.error.message);
      }
    );
  }

  ngOnInit() {}


}
