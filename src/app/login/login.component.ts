import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import {AuthenticationService} from '../services/authenicationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg: string;
  returnUrl: string;
  loading = false;
  usName= 'admin';
  currentUser: string;

  loginForm= new FormGroup ({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private appComp: AppComponent ) { }

  ngOnInit() {
    // this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.usName = this.loginForm.controls['userName'].value;
    this.authenticationService.login(this.loginForm.controls['userName'].value , this.loginForm.controls['password'].value)
            .subscribe(
                data => {
                  let user = JSON.parse(sessionStorage.getItem('currentUser'));
                  this.currentUser = user._id;
                  // this.appComp.currentUser = user.firstName + ' ' + user.lastName;
                //  this.appComp.loginVisibility = false;
                
                    // this.router.navigate(['/home', this.currentUser]);
                    this.router.navigate(['/home']);
                 window.history.pushState(null, null, 'login'); 
                }
                , error =>{
                  console.log(error);
                });

  }
}
