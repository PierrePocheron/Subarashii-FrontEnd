import { firstValueFrom } from 'rxjs';
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
    const data = await firstValueFrom($get);
    return data;
  }

  async addList(dataForm: any) {
    const $post = this.http.post(environment.backUrl + 'userlists', dataForm);
    await firstValueFrom($post);
    return true;
  }

  async addAnimeList(idAnime: number, idList: number = -1) {
    if (idList == -1) {
      const myList: any = await this.getMyList();
      idList = myList.body[0].id;
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
}
