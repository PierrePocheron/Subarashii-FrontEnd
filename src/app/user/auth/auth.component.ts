import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('' ,[Validators.required]),
    password: new FormControl('' ,[Validators.required, Validators.minLength(3)]),
  });
  message = '';
  constructor(private authS: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(){
    const result = await this.authS.login(this.loginForm.value);
    if(result)
      this.router.navigate(['/']);
    this.message = 'Identifiant ou mot de passe incorrect';
  }
}
