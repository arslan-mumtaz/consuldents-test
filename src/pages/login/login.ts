import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,MenuController, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { APIVariables } from '../../auth.variables';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, 
              public userData: UserData, public http:Http, public menu:MenuController) { }

  onLogin(form: NgForm) {
    this.submitted = true;
 let headers = new Headers ({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
let options = new RequestOptions({ headers: headers, method: "post" });


let body='identity='+this.login.username+'&password='+this.login.password+'&api_key='+APIVariables.API_KEY;
console.log(body);
     if (form.valid) {
   
this.http.post(APIVariables.API_URL+'user/login',body,options)
.map(res => res.json()).subscribe(res => {
  
    console.log(res.data);
    console.log(res.data.user_id);
    console.log(res.data.access_token);

    this.userData.login(res.data.email ,res.data.user_id, res.data.access_token);
    this.navCtrl.push(TabsPage);
    }, (err) => {
    let alert = this.alertCtrl.create({
    title: 'Response message',
    subTitle: "Invalid Password",
    buttons: ['Dismiss']
  });
  alert.present();
});
}
     // this.navCtrl.push(TabsPage);
    }
  
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }
  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
