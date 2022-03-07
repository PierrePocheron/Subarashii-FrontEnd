import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  async login(data: any): Promise<boolean> {
    const request = this.http.post(environment.backUrl + 'users/sign-in', data);
    try {
      const dataRequest: any = await firstValueFrom(request);
      localStorage.setItem('token', dataRequest.body.token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async register(data: any): Promise<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const request = this.http.post(environment.backUrl + 'users/sign-up', data);
    try {
      await firstValueFrom(request);
      return true;
    } catch (error) {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    if (token) return !this.jwtHelper.isTokenExpired(token);
    return false;
  }
}
