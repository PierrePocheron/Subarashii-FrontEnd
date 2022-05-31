import { Component, OnInit } from '@angular/core';
import { AnimesCommentsService } from 'src/app/services/animescomments.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent implements OnInit {

  arrayComments: Array<any>;

  constructor(private animesCommentsService: AnimesCommentsService) {
    this.arrayComments = [];
  }

  ngOnInit(): void {
    const comments = this.animesCommentsService.getComments();
    comments.then((comment) => {
      this.arrayComments = comment.body;
      for (let i = 0; i < this.arrayComments.length; i++) {
        this.arrayComments[i].date = this.arrayComments[i].date.substring(0, this.arrayComments[i].date.length - 9);
      }
    })
  }
}
