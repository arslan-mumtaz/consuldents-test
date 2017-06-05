import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';
import { APIVariables } from '../../auth.variables';
@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;

    constructor(public navCtrl: NavController, public userData: UserData, public http:Http) { }

  onSignup(form: NgForm) {
    this.submitted = true;

 let headers = new Headers ({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
let options = new RequestOptions({ headers: headers, method: "post" });

let body='email='+this.signup.username+'&password='+this.signup.password+'&api_key='+APIVariables.API_KEY;

     if (form.valid) {
   
this.http.post(APIVariables.API_URL+'user/sign-up',body,options)
.map(res => res.json()).subscribe(res => {
alert("success "+res.message+ 'hello '+ this.signup.username);
    this.userData.login(this.signup.username , "password" , "pic");
 this.navCtrl.push(TabsPage);
}, (err) => {
alert("failed");
});
}
    
}
}
