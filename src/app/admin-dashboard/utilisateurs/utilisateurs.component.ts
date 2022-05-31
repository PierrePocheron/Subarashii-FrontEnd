import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  arrayUsers: Array<any>

  constructor() {
    this.arrayUsers = []
  }

  ngOnInit(): void {
  }

}
