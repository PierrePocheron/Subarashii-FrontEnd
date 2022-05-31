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

  async getNbUser() {
    const get$ = this.http.get(environment.backUrl + 'statsmetrics/count/users/user');
    const data: any = await firstValueFrom(get$);
    return data;
  }

  async getNbAdmin() {
    const get$ = this.http.get(environment.backUrl + 'statsmetrics/count/users/admin');
    const data: any = await firstValueFrom(get$);
    return data;
  }

  async getAllUser() {
    const get$ = this.http.get(environment.backUrl + 'users/all');
    const data: any = await firstValueFrom(get$);
    return data;
  }

  async patchUpgrade(idUser: number) {
    try {
      const $post = this.http.patch(environment.backUrl + 'users/'+idUser+'/role/admin', {})
      const res = await firstValueFrom($post);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async patchDown(idUser: number) {
    try {
      const $post = this.http.patch(environment.backUrl + 'users/'+idUser+'/role/user', {})
      const res = await firstValueFrom($post);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async delete(idUser: number) {
    try {
      const $delete = this.http.delete(environment.backUrl + 'users/'+idUser)
      const res = await firstValueFrom($delete);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }
}
