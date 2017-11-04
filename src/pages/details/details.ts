import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Result } from '../home/home';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  details: Result;

  constructor(navParams: NavParams) {
    this.details = navParams.get('result');
  }
}
