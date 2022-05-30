import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseService } from './response.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient,    private responseS: ResponseService
    ) {}

  async getUser() {
    const get$ = this.http.get(environment.backUrl + 'users/current');
    const data: any = await firstValueFrom(get$);
    return data;
  }

  async postUserPassword(password: string) {
    try {
      const $post = this.http.patch(environment.backUrl + 'users/current/password', {password} )
      const res = await firstValueFrom($post);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async postUserUsername(password: string) {
    try {
      const $post = this.http.patch(environment.backUrl + 'users/current/username', {username: password} )
      const res = await firstValueFrom($post);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }
}
