import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AlertController, NavController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';

import { apiKey } from '../../app/tmdb';
import { DetailsPage } from '../details/details';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  readonly detailsPage: typeof DetailsPage = DetailsPage;
  movies: Observable<Movie[]>;
  query: string = '';

  private shakeSub: Subscription;

  constructor(
    private alert: AlertController,
    private nav: NavController,
    private http: HttpClient,
    private shake: Shake
  ) {
    this.getMovies();
  }

  ionViewDidEnter(): void {
    this.shakeSub = this.shake.startWatch()
      .switchMap(() => this.discoverMovies())
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave(): void {
    this.shakeSub.unsubscribe();
  }

  getMovies(): void {
    const query: string = this.query.trim();
    if (query.length < 3) { this.movies = Observable.of([]); }
    else { this.movies = this.fetchMovies(query); }
  }

  private fetchMovies(query: string): Observable<Movie[]> {
    const url: string = 'https://api.themoviedb.org/3/search/movie';
    return this.http.get<Movie[]>(url, {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('query', query)
    }).pluck('results');
  }

  private discoverMovies(): Observable<Movie[]> {
    const url: string = 'https://api.themoviedb.org/3/discover/movie';
    return this.http.get<Movie[]>(url, {
      params: new HttpParams()
        .set('api_key', apiKey)
        .set('primary_release_year', '2018')
    }).pluck('results');
  }

  private showRandomMovieAlert(movies: Movie[]): void {
    const movie: Movie = movies[Math.floor(Math.random() * movies.length)];
    if (!movie) { return; }
    this.alert.create({
      title: movie.title,
      message: movie.overview,
      buttons: [{ text: 'Cancel' }, {
        handler: () => { this.nav.push(this.detailsPage, { movie }) },
        text: 'Details'
      }]
    }).present();
  }
}
