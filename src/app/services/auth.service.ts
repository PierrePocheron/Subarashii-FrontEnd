import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  async login(data: any) : Promise<boolean> {
    const request = this.http.post(environment.backUrl + 'users/sign-in', data);
    try {
      const dataRequest: any = await firstValueFrom(request);
      localStorage.setItem('token', dataRequest.body.token);
      return true;
    } catch (error) {
      return false
    }
  }

  public isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();
    console.log(this.jwtHelper.getTokenExpirationDate(token))
    if(token)
      return !this.jwtHelper.isTokenExpired(token);
    return false;
  }
}
