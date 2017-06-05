import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ProjectPage } from '../project/project';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = ProjectPage;
  tab2Root: any = AboutPage;
  tab3Root: any = AboutPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
