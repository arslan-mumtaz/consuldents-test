import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string ,  userId : string, access_token : string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    //this.storage.set('token' , access_token);
    console.log(this.storage);
    this.setUsername(username);
    this.setUserId(userId);
    this.setToken(access_token);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };
 

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };


  // method to set token to the local storage
  setToken(access_token : string): void{
    this.storage.set('token' , access_token);
  };

  // method to get token from the first time on login
  getToken() : Promise<string> {
    return this.storage.get('token').then((value)=>{
      return value;
    });
  };

  setProfile_Pic(ProfilePic: string): void {
    this.storage.set('profile_pic', ProfilePic);
  };

  getProfile_Pic(): Promise<string> {
    return this.storage.get('profile_pic').then((value) => {
      return value;
    });
  };

  setUserId(userId : string): void {
    this.storage.set('userId' , userId);
  }

  getUserId(): Promise<string> {
    return this.storage.get('userId').then((value) => {
      return value;
    });
  };

  getFullName(): Promise<string> {
    return this.storage.get('full_name').then((value) => {
      return value;
      
    });
  };

  setChangePassword(full_name : string): void {
    this.storage.set('password' , full_name);
  }

  getChangePassword(): Promise<string> {
    return this.storage.get('password').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
