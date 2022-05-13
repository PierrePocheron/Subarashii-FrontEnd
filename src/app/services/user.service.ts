import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getUser() {
    const get$ = this.http.get(environment.backUrl + 'users/current');
    const data: any = await firstValueFrom(get$);
    return data;
  }
}
