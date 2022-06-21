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
        environment.backUrl + 'secretquestions/all'
      );
      const value: any = await firstValueFrom(dataP);
      return value;
  }

  async postQuestion(data: string) {
    try {
      const dataP = this.http.post(
        environment.backUrl + 'secretquestions',
        {question: data}
      );
      const res = await firstValueFrom(dataP);
      return this.responseS.SuccessF(res);
    } catch (error: any) {
      return this.responseS.ErrorF(error);
    }
  }

  async delete(idQuestion: number) {
    try {
      const $delete = this.http.delete(environment.backUrl + 'secretquestions/'+idQuestion)
      const res = await firstValueFrom($delete);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }

  async postChangeQuestion(question: string, idQuestion: number) {
    try {
      const $post = this.http.patch(environment.backUrl + 'secretquestions/'+idQuestion, {question} )
      const res = await firstValueFrom($post);
      this.responseS.SuccessF(res);
      return true;
    } catch (error) {
      return this.responseS.ErrorF(error);
    }
  }
}
