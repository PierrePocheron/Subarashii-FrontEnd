import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAnimeService {
  constructor(private http: HttpClient) {}

  async get(url: string, search: object = {}) {
    var params = {
      params: {},
    };

    if (search != {}) {
      params = {
        params: search,
      };
    }
    const get$ = this.http.get(environment.apiAnimeUrl + url, params);
    const dataPromise = firstValueFrom(get$);
    return dataPromise;
  }
}
