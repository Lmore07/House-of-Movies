import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media, MediaType, PageResult } from '../interfaces/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  constructor(private http: HttpClient) {}

  apiBaseUrl = environment.API_BASE_URL;

  _fetchTMDB(
    url: string,
    param: Record<string, string | number | boolean | undefined> = {}
  ): Observable<any> {
    let params = new HttpParams()
      .set('language', 'es-ES')
      .set('page', param['page']?.toString() ? param['page'].toString() : 1);
    if (param['include_adult'] != undefined) {
      params = params.append('include_adult', param['include_adult']);
    }
    if (param['with_genres'] != undefined) {
      params = params.append('with_genres', param['with_genres']);
    }
    if (param['query'] != undefined) {
      params = params.append('query', param['query']);
    }
    return this.http.get(`${this.apiBaseUrl}/tmdb/${url}`, { params });
  }

  _fetchImage(url: string, width: number, heigth: number) {
    return `${this.apiBaseUrl}/ipx/f_webp&s_${width}x${heigth}/tmdb${url}`;
  }

  _fetchImageOriginal(url: string) {
    return `${this.apiBaseUrl}/ipx/f_webp/tmdb/${url}`;
  }

  _fetchImageYoutube(width: number, heigth: number, id: string) {
    return `${this.apiBaseUrl}/ipx/f_webp&s_${width}x${heigth}/youtube/vi/${id}/maxresdefault.jpg`;
  }

  fetchTMDB(
    url: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): Observable<any> {
    return this._fetchTMDB(url, params);
  }

  getImage(url: string, width: number, heigth: number) {
    return this._fetchImage(url, width, heigth);
  }

  listMedia(
    type: MediaType,
    query: string,
    page: number
  ): Observable<PageResult<Media>> {
    return this.fetchTMDB(`${type}/${query}`, { page });
  }

  getInfoMovieSerie(type: MediaType, tmdb: number) {
    return this.fetchTMDB(
      `${type}/${tmdb}?append_to_response=videos,images,credits,external_ids,release_dates,combined_credits&include_image_language=en&language=es-EC`
    );
  }

  getInfoPerson(id: number) {
    return this.fetchTMDB(
      `person/${id}?append_to_response=videos,images,external_ids,combined_credits&include_image_language=en&language=es-ES`
    );
  }

  getRecommendations(type: MediaType, tmdb: number, page: number) {
    return this.fetchTMDB(`${type}/${tmdb}/recommendations`, { page: page });
  }

  getMediaByGenre(idGenre: number, type: MediaType, page: number) {
    return this.fetchTMDB(`discover/${type}`, {
      page: page,
      with_genres: idGenre,
    });
  }

  getGenresByType(type: MediaType) {
    return this.fetchTMDB(`genre/${type}/list`, {});
  }

  searchMedia(query: string, page: number) {
    return this.fetchTMDB(`search/multi`, {
      page: page,
      query: query,
      include_adult: true,
    });
  }

  getImageYoutube(id: string, width: number, heigth: number) {
    return this._fetchImageYoutube(width, heigth, id);
  }
}
