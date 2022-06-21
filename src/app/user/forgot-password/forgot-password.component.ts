import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
 
  email = new FormControl('', [Validators.required])
  an = new FormControl('', [Validators.required])

  message = '';

  constructor(private authS: AuthService, private router: Router, private userservice: UserService) {
    (this.isEmailOk = false); (this.isAnswerOk = false); (this.secretQuestion = '');  (this.idUser = 0)
  }

  idUser: number;
  secretQuestion : string;
  isEmailOk: boolean;
  isAnswerOk: boolean;

  ngOnInit(): void {
    const dataUser : any = this.userservice.getUser()
    this.idUser = dataUser.body.idUser;
    const dataQuestion : any = this.userservice.getQuestion(this.idUser);
    this.secretQuestion = dataQuestion.body.question;
  }


  emailValidate() {
    const result = this.email.value;
    console.log(result);
    this.isEmailOk = true;
  }

  secretQuestionValidate() {
    this.isAnswerOk = true;
  }

  PasswordChange() {
    window.location.href = '/login';
  }
}
