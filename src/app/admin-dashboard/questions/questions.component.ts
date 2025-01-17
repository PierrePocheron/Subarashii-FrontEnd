import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecretQuestionService } from 'src/app/services/secretQuestion.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  arrayQuestions: Array<any>;
  openForm: boolean;
  question = new FormControl('');
  questionChange = new FormControl('');
  openFormChange: Array<boolean>;

  constructor(private secretQuestionService: SecretQuestionService) {
    this.arrayQuestions = [];
    this.openForm = false;
    this.openFormChange = [];
  }

  ngOnInit(): void {
    const data = this.secretQuestionService.getQuestion();
    data.then((question) => {
      this.arrayQuestions = question.body;
    })
  }

  async delete(idQuestion: number) {
    await this.secretQuestionService.delete(idQuestion);
    location.reload()
  }

  clickOpenForm() {
    this.openForm = true;
  }

  async submitQuestion() {
    await this.secretQuestionService.postQuestion(this.question.value);
    location.reload()
  }

  update(idQuestion: number) {
    this.openFormChange[idQuestion] = true;
    for (let question of this.arrayQuestions) {
      if (question.idSecretQuestion === idQuestion) {
        this.questionChange.setValue(question.question);
      }
    }
  }

 async changeQuestion(idQuestion: number) {
    await this.secretQuestionService.postChangeQuestion(this.questionChange.value, idQuestion)
    location.reload();
  }
}

