import { ResponseService } from './response.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private responseS: ResponseService
  ) {}

  async login(data: any): Promise<boolean> {
    try {
      const request = this.http.post(
        environment.backUrl + 'users/sign-in',
        data
      );
      const dataRequest: any = await firstValueFrom(request);
      localStorage.setItem('token', dataRequest.body.token);
      this.responseS.SuccessF(dataRequest);
      return true;
    } catch (error: any) {
      this.responseS.ErrorF(error.error);
      return false;
    }
  }

  async register(data: any): Promise<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const request = this.http.post(environment.backUrl + 'users/sign-up', data);
    try {
      const res = await firstValueFrom(request);
      this.responseS.SuccessF(res);
      return true;
    } catch (error: any) {
      this.responseS.ErrorF(error.error);
      return false;
    }
  }

  public isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    if (token) return !this.jwtHelper.isTokenExpired(token);
    return false;
  }

  public logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  public userConnected(): string {
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token, { header: true });
    return decodedToken.username;
  }
}
