import { Component } from '@angular/core';

import { DetailsPage } from '../details/details';

export interface Result {
  author: string;
  date: number;
  image: string;
  title: string;
}

const fakeResults: Result[] = [{
  author: 'Author 1',
  date: 2017,
  image: 'http://lorempixel.com/300/300/people/1',
  title: 'Result 1'
}, {
  author: 'Author 2',
  date: 2017,
  image: 'http://lorempixel.com/300/300/people/2',
  title: 'Result 2'
}];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detailsPage: typeof DetailsPage = DetailsPage;
  query: string = '';
  results: Result[];

  constructor() {
    this.getResults();
  }

  getResults(): void {
    switch (this.query.length) {
    case 0:
      this.results = [];
      break;
    case 1:
    case 2:
      break;
    default:
      this.results = fakeResults;
    }
  }
}
