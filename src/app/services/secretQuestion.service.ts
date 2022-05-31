import { ResponseService } from './response.service';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecretQuestionService {
  constructor(private http: HttpClient, private responseS: ResponseService) {}

  async getQuestion() {
      const dataP = this.http.get(
        environment.backUrl + 'secretquestions'
      );
      const value: any = await firstValueFrom(dataP);
      return value;
  }
}
