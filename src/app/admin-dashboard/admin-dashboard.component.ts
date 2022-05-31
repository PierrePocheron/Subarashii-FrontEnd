import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';
import { AnimeService } from '../services/anime.service';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  nbUser: number;
  nbAdmin: number;
  nbComments: number;
  nbAnimes: number;
  nbEpisodes: number;
  nbCategories: number;

  constructor(private userService: UserService, private commentService: CommentService, private animeService: AnimeService) {
    this.nbUser = 0;
    this.nbAdmin = 0;
    this.nbComments = 0;
    this.nbAnimes = 0;
    this.nbEpisodes = 0;
    this.nbCategories = 0;
  }

  async ngOnInit() {
    const nbUser: any = await this.userService.getNbUser();
    this.nbUser = nbUser.body;
    const nbAdmin: any = await this.userService.getNbAdmin();
    this.nbAdmin = nbAdmin.body;
    const nbComments: any = await this.commentService.getComments();
    this.nbComments = nbComments.body;
    const nbAnimes: any = await this.animeService.getAnimes();
    this.nbAnimes = nbAnimes.body;
    const nbEpisodes: any = await this.animeService.getEpisodes();
    this.nbEpisodes = nbEpisodes.body;
    const nbCategories: any = await this.animeService.getCategories();
    this.nbCategories = nbCategories.body;
    const ctx = document.getElementById('myChart') as ChartItem;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['User', 'Admin'],
        datasets: [{
          data: [this.nbUser, this.nbAdmin],
          backgroundColor: [
            'rgb(255,71,63)',
            'rgb(194,0,27)',
          ],
        }]
      },

    });
  }

}
