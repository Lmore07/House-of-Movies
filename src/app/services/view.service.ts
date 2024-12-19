import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  constructor(private http: HttpClient) { }

  apiBaseUrlView = 'https://corsproxy.io/?';
  apiBaseUrlView2 =
    'https://corsproxy.io/?' +
    encodeURIComponent(environment.API_BASE_URL_VIEW_2);
  apiToken = environment.TOKEN;

  _fetchView(
    url: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Observable<any> {
    let routeCuevana = 'https://cors-anywhere.herokuapp.com/' +
      `${environment.API_BASE_URL_VIEW}/_next/data/${this.apiToken}/es/${url}`;
    return this.http.get(
      routeCuevana,
      params
    );
  }

  fetchView(
    url: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Observable<any> {
    return this._fetchView(url, params);
  }

  viewAndDownloadMovie(tmdb: number) {
    return this.fetchView(`pelicula/${tmdb}/response.json`, { tmdb });
  }

  getSerieInfo(tmdb: number, name: string) {
    return this.fetchView(`serie/${tmdb}/${name}.json`, { tmdb });
  }

  viewAndDownloadSerie(url: string) {
    return this.fetchView(`${url}.json`, {});
  }

  //API NUMERO 2 POR SI LA 1 FALLA

  _fetchView2(url: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrlView2}/wp-json/cuevana/v1${url}`);
  }

  fetchView2(url: string): Observable<any> {
    return this._fetchView2(url);
  }

  getMovieAndSerieInfo2(name: string) {
    return this.fetchView2(`/single/${name}-online-gratis-en-cuevana`);
  }

  getEpisodes2(id: number) {
    return this.fetchView2(`/Episodes/${id}`);
  }

  _fetchImage2(url: string) {
    return `https://image.tmdb.org/t/p/original/${url}`;
  }

  getImage2(url: string) {
    return this._fetchImage2(url);
  }
}
