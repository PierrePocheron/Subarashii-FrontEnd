import { ResponseService } from './response.service';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private responseS: ResponseService) {}

  async getComment(idAnime: number) {
    const dataP = this.http.get(
      environment.backUrl + 'animes-comments/' + idAnime
    );
    const data: any = await firstValueFrom(dataP);
    return data.body;
  }

  async addComment(data: any) {
    try {
      const dataP = this.http.post(
        environment.backUrl + 'animes-comments',
        null
      );
      await firstValueFrom(dataP);
      return true;
    } catch (error: any) {
      console.log(error.message);

      this.responseS.ErrorF(error);
      return false;
    }
  }
}
