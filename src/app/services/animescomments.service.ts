import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimesCommentsService {
  constructor(private http: HttpClient) { }

  async getComments() {
    const get$ = this.http.get(environment.backUrl + 'animes-comments');
    const data: any = await firstValueFrom(get$);
    return data;
  }
}
