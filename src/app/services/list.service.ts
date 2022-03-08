import { Response } from './../interfaces/response';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  async getMyList() {
    const $get = this.http.get(environment.backUrl + 'userlists/mylist');
    const data: any = await firstValueFrom($get);
    return data.body;
  }

  async addList(dataForm: any) {
    const $post = this.http.post(environment.backUrl + 'userlists', dataForm);
    await firstValueFrom($post);
    return true;
  }

  async addAnimeList(idAnime: number, idList: number = -1) {
    if (idList == -1) {
      const myList = await this.getMyList();
      idList = myList[0].id;
    }
    const json = {
      idUserList: idList,
      idApiAnime: idAnime,
    };
    const $put = this.http.put(
      environment.backUrl + 'userlists/addanime',
      json
    );
    await firstValueFrom($put);
    return true;
  }

  async myAnimeIdSeeList() {
    const $get = this.http.get(environment.backUrl + 'users/idapianimes');
    const data: any = await firstValueFrom($get);
    return data.body;
  }

  async changeStateViewEpisode(idAnime: number, idEpisode: number) {
    const put$ = this.http.put(
      environment.backUrl +
        'views/animes/' +
        idAnime +
        '/episodes/' +
        idEpisode,
      null
    );
    const data: any = await firstValueFrom(put$);
    return data.body;
  }

  async getEpisodeViews(idAnime: number) {
    const $get = this.http.get(environment.backUrl + 'views/animes/' + idAnime);
    const data: any = await firstValueFrom($get);
    return data.body;
  }
}
