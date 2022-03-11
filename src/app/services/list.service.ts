import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseService } from './response.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient, private responseS: ResponseService) {}

  async getMyList() {
    try {
      const $get = this.http.get(environment.backUrl + 'userlists/all');
      const data: any = await firstValueFrom($get);
      return data.body;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async addList(dataForm: any) {
    try {
      const $post = this.http.post(environment.backUrl + 'userlists', dataForm);
      const res = await firstValueFrom($post);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async addAnimeList(idAnime: number, idList: number = -1) {
    try {
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
      const res = await firstValueFrom($put);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async myAnimeIdSeeList() {
    try {
      const $get = this.http.get(environment.backUrl + 'users/idapianimes');
      const data: any = await firstValueFrom($get);
      return data.body;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async changeStateViewEpisode(idAnime: number, idEpisode: number) {
    try {
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
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async getEpisodeViews(idAnime: number) {
    try {
      const $get = this.http.get(
        environment.backUrl + 'views/animes/' + idAnime
      );
      const data: any = await firstValueFrom($get);
      return data.body;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async getAnimeList(idList: number) {
    try {
      const $get = this.http.get(
        environment.backUrl + 'userlists/' + idList + '/animes'
      );
      const data: any = await firstValueFrom($get);
      return data.body;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async deleteList(idList: number) {
    try {
      const $delete = this.http.delete(
        environment.backUrl + 'userlists/' + idList
      );
      const res: any = await firstValueFrom($delete);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async deleteAnimeList(idAnime: number, idList: number) {
    try {
      const $delete = this.http.delete(
        environment.backUrl + 'userlists/' + idList + '/animes/' + idAnime
      );
      const res: any = await firstValueFrom($delete);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }
}
