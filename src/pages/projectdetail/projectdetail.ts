import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProjectdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-projectdetail',
  templateUrl: 'projectdetail.html',
})
export class ProjectdetailPage {
 project:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.project = this.navParams.data.project;
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProjectdetailPage');
  // }

}
