import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { APIVariables } from '../../auth.variables';
/*
  Generated class for the ProjectServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectService {

 data:any;

  constructor(public http: Http) {
   // console.log('Hello ProjectServiceProvider Provider');
   this.load();
   //this.load_Info();
  }
      load() {
        if (this.data) {
          // already loaded data
          return Promise.resolve(this.data);
        } else{
          // don't have the data yet
        return new Promise(resolve => {
          // We're using Angular HTTP provider to request the data,
          // then on the response, it'll map the JSON data to a parsed JS object.
          // Next, we process the data and resolve the promise with the new data.
          this.http.get(APIVariables.API_URL+'project/index?api_key='+APIVariables.API_KEY)
            .map(res => res.json())
            .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.data = data.data.items;
              resolve(this.data);
            });
        });
      }
  }

  //  load_Info() {
  //       if (this.data) {
  //         // already loaded data
  //         return Promise.resolve(this.data);
  //       } else{
  //         // don't have the data yet
  //       return new Promise(resolve => {
  //         // We're using Angular HTTP provider to request the data,
  //         // then on the response, it'll map the JSON data to a parsed JS object.
  //         // Next, we process the data and resolve the promise with the new data.
  //         let body ='id=122'+'&api_key='+APIVariables.API_KEY+'&token=29JeyzzvaQNW0JuMHgL8_OazzqH5-lVnP68mFLYe';
  //         console.log(body);
  //         this.http.get(APIVariables.API_URL+'user/info?',body)
  //           .map(res => res.json())
  //           .subscribe(data => {
  //             console.log("Response Data" +data);
  //             console.log("Full name" +data.full_name);
  //             console.log("Profile Pic" +data.profile_photo);
  //             // we've got back the raw data, now generate the core schedule data
  //             // and save the data for later reference
  //             this.data = data.data.items;
  //             resolve(this.data);
  //           });
  //       });
  //     }
  // }
}



