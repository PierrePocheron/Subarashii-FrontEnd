import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseService } from './response.service';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}

  async get(url: string, search: any = {}) {
    const params = {
      params: search,
    };
    const get$ = this.http.get(environment.apiAnimeUrl + url, params);
    const data = await firstValueFrom(get$);
    return data;
  }

  async getGenres(id: number = -1) {
    const get$ = this.http.get(environment.backUrl + 'genres/all');
    const data: any = await firstValueFrom(get$);
    data.body = data.body.filter((el: any) => {
      if (el.id != 2) {
        return el;
      }
    });
    return data;
  }

  async getEpisodesSaison(idAnime: number, idSaison: number) {
    const get$ = this.http.get(
      environment.apiAnimeUrl + idAnime + '/season/' + idSaison
    );
    const data: any = await firstValueFrom(get$);
    return data.body;
  }
}
