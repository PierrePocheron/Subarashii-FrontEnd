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
  isError: boolean;

  constructor(private userService: UserService,
    ) {

    this.isOpenInputName = false;
    this.isOpenInputPassword = false;
    this.isError = false;
  }

  async ngOnInit() {
    const dataUser: any = await this.userService.getUser();
    console.log(dataUser.body[0])
  }

  openInputName(): void {
    this.isOpenInputName = true;
  }
  openInputPassword(): void {
    this.isOpenInputPassword = true;
  }

  submit(): void {
    if(this.updateForm.get('password')?.value.length < 5) {
      this.isError = true;
    }
    else {
      this.isError = false;
    }
  }
}
