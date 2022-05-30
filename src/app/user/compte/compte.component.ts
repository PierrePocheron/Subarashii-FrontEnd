import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  isOpenInputName: boolean;
  isOpenInputPassword: boolean;
  updateForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isErrorPassword: boolean;
  isErrorUsername: boolean;
  username : string;
  email: string;
  password: string;

  constructor(private userService: UserService,
    ) {

    this.isOpenInputName = false;
    this.isOpenInputPassword = false;
    this.isErrorPassword = false;
    this.isErrorUsername = false;
    this.username = '';
    this.email = '';
    this.password = '';
  }

  async ngOnInit() {
    const dataUser: any = await this.userService.getUser();
    this.email = dataUser.body.email;
    this.username = dataUser.body.username;
    this.password = dataUser.body.password;
  }

  openInputName(): void {
    this.isOpenInputName = true;
  }
  openInputPassword(): void {
    this.isOpenInputPassword = true;
  }

  submitUsername(): void {
    if(this.updateForm.get('username')?.value != '') {
      this.username = this.updateForm.get('username')?.value;
      this.isOpenInputName = false;
      this.isErrorUsername = false;
      this.userService.postUserUsername(this.username);
    }
    else {
      this.isErrorUsername = true
    }
  }

  submitPassword(): void {
    if(this.updateForm.get('password')?.value.length < 5 && this.updateForm.get('password')?.value != '') {
      this.isErrorPassword = true;
    }
    else {
      this.password = this.updateForm.get('password')?.value;
      this.isErrorPassword = false;
      this.isOpenInputPassword = false;
      this.userService.postUserPassword(this.password);
    }
  }
}
