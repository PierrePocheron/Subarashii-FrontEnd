import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  arrayUsers: Array<any>

  constructor(private userService: UserService) {
    this.arrayUsers = []
  }

  ngOnInit(): void {
    const users = this.userService.getAllUser();
    users.then((user) => {
      console.log(user.body)
      this.arrayUsers = user.body;
    })
  }

 async upgrade(idUser: number) {
    await this.userService.patchUpgrade(idUser);
    location.reload()
  }

  async down(idUser: number) {
    await this.userService.patchDown(idUser);
    location.reload();
  }

}
