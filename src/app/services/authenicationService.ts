import {Component} from '@angular/core';
import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request,
  RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Component({

})

export class AuthenticationService{


constructor(private http:HttpClient)
{

}


login(usrName, password) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    let parameter = JSON.stringify({ 'username': usrName, 'password': password });

    return this.authenticate('http://localhost:3001/user/authenticate', parameter, options);

  }
    authenticate(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>{
        
             return this.http.post(url, JSON.parse(body))
              .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (response.status < 200 || response.status >= 300) {
                  throw new Error('' + response.status);
                }
                
                let temp = JSON.stringify(response);
                let user = JSON.parse(temp);
               
                if (user && user.token) {
                   
                  sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
              }).catch(this.handleError);
            }

            private handleError(error: any) {
                console.log('Following Error:' + error);
                if (error.status === 401) {
                    // 401 unauthorized response so log user out of client
                  alert('Unauthorized User!!');
                  }
                return Observable.throw(error._body);
            }

}