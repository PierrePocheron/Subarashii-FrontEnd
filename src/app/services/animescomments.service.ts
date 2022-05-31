import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseService } from './response.service';

@Injectable({
  providedIn: 'root',
})
export class AnimesCommentsService {
  constructor(private http: HttpClient, private responseS: ResponseService) { }

  async getComments() {
    const get$ = this.http.get(environment.backUrl + 'animes-comments');
    const data: any = await firstValueFrom(get$);
    return data;
  }

  async delete(idComment: number) {
    try {
      const $delete = this.http.delete(environment.backUrl + 'animes-comments/'+idComment)
      const res = await firstValueFrom($delete);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }
}
