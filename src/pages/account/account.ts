import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavController , ActionSheetController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { APIVariables } from '../../auth.variables';
import {Http, Headers, RequestOptions} from '@angular/http';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  userId : any;
  token : any;
  password : string;
  full_name : string;
  data : any;
  name : any;
  image : any;


  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData,
              public actionSheetCtrl : ActionSheetController , public http : Http, public storage: Storage) {
         //   this.load_Info();
        // this.getToken();
  }

   load_Info() {
        if (this.data) {
          // already loaded data
          return Promise.resolve(this.data);
        } else{
          // don't have the data yet
        return new Promise(resolve => {
          // We're using Angular HTTP provider to request the data,
          // then on the response, it'll map the JSON data to a parsed JS object.
          // Next, we process the data and resolve the promise with the new data.

           this.storage.get('userId').then((user)=>{
            // console.log("This is user ID in Account user" + user);
              this.userId = user;
              this.storage.get('token').then((token)=>{
                  this.token = token;
              })
             //console.log("This is user ID in UserId" + this.userId);
            //  let headers = new Headers ({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
         // let options = new RequestOptions({ headers: headers, method: "get" });
          let body ='id='+this.userId+'&api_key='+APIVariables.API_KEY+'&token='+this.token;
          console.log(body);
          this.http.get(APIVariables.API_URL+'user/info?'+body)
            .map(res => res.json())
            .subscribe(data => {
              this.name = data.data.full_name;
              this.image = data.data.profile_photo;
              console.log("Response Data" +data);
              console.log("Full name" +data.data.full_name);
              console.log("Profile Pic" +data.data.profile_photo);
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.data = data.data;
              resolve(this.data);
            });

          });
         
        });
      }
  }

  ngAfterViewInit() {
    this.getUsername();
    this.getUserId();
    this.getToken();
    this.load_Info();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

 

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
      console.log("This is username :" +this.username);
    });
  }

   getToken() {
    this.userData.getToken().then((token) => {
      this.token = token;
      console.log("This is Token :" +this.token);
    });
  }

  

   getUserId() {
    this.userData.getUserId().then((userId) => {
      this.userId = userId;
      console.log("This is user ID" +this.userId);
    });
  }

  getFullname(){
    this.userData.getFullName().then((full_name)=>{
      this.full_name = full_name;
      console.log("This is user ID" +this.full_name);
    })
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      title : "Forgot/Change Password",
      buttons : ['Cancel']
    });
    alert.addInput({
        name: 'New Password',
        value : this.userId,
        placeholder : 'Your New Password' 
    });
    alert.addButton({
      text : 'OK',
      handler : (data : any)=>{
        this.userData.setChangePassword(data.full_name);
        this.getChangePassowrd();
      }
    });
    alert.present();

  }
   getChangePassowrd(){
    this.userData.getChangePassword().then((password)=>{
      this.password = password;
    })
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
