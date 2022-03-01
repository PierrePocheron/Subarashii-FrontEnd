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
    const request = this.http.post(environment.backUrl + 'users/sign-in', data, {observe: "response"});
    try {
      const dataRequest = await firstValueFrom(request);
      const dataE = await dataRequest
      let header: HttpHeaders = await dataE.headers;
      console.log(header.get('Authorization'))
      localStorage.setItem('token' , 'null')
      return true;
    } catch (error) {
      console.log(error);
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
