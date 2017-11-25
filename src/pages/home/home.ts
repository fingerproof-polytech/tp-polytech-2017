import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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

  constructor(private httpClient: HttpClient) {
    this.getMovies();
  }

  getMovies(): void {
    const query: string = this.query.trim();
    if (query.length < 3) { this.movies = Observable.of([]); }
    else { this.movies = this.fetchMovies(query); }
  }

  private fetchMovies(query: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      'https://api.themoviedb.org/3/search/movie',
      { params: new HttpParams().set('api_key', apiKey).set('query', query) }
    ).pluck('results');
  }
}
