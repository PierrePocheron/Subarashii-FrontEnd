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
    console.log(comments)
    comments.then((comment) => {
      this.arrayComments = comment.body;
      for (let aComment of this.arrayComments) {
       aComment.date = aComment.date.substring(0, aComment.date.length - 9);
      }
    })
  }

  async delete(idComment: number) {
   await this.animesCommentsService.delete(idComment);
    location.reload()
  }
}
