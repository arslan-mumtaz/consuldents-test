import { Component} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { ProjectService } from '../../providers/project-service/project-service';
import { ProjectdetailPage } from '../projectdetail/projectdetail';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
/**
 * Generated class for the ProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
  providers: [ProjectService]
})
export class ProjectPage {

    // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element

 response: any;
projects: any;
searchTerm: string = '';
    searchControl: FormControl;
    searching: any = false;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public projectService:ProjectService,
    private loadingCtrl: LoadingController
    ) {
     let loadingPopup = this.loadingCtrl.create({
      content: 'Loading projects...'
    });
    this.loadProjects();
    this.searchControl = new FormControl();
   loadingPopup.dismiss();
  }
   ionViewDidLoad() {
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.searching = false;
        });
    }
   loadProjects(){
    this.projectService.load()
    .then(data => {
      this.response = data;
      this.initializeItems();
    });
  }
 
     initializeItems() {
    this.projects = this.response;
    console.log(this.projects);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.searching = true;
    this.initializeItems();

    // set val to the value of the searchbar
    let val = this.searchTerm;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.projects = this.projects.filter((item:any) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
goToProjectDetail(data: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(ProjectdetailPage, {
      project: data
    });
  }
}
