import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecretQuestionService } from 'src/app/services/secretQuestion.service';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  arrayQuestions = [];
  public message = '';
  constructor(
    private authS: AuthService,
    private secretQuestion: SecretQuestionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
        username: ['', [Validators.required]],
        secretQuestion: ['', [Validators.required]],
        answerSecretQuestion: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  async ngOnInit() {
    const allQuestions = this.secretQuestion.getQuestion();

    allQuestions.then((question) => {
      this.arrayQuestions = question.body;
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  async register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const result = await this.authS.register(this.registerForm.getRawValue());
    if (result) this.router.navigate(['/']);
    this.message = 'Identifiant ou mot de passe incorrect';
  }
}
