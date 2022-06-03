import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  favoris: number;
  aVoir: number;
  enCours: number;
  termines: number;
  enAttente: number;
  comments: number;

  constructor(private userService: UserService) {
    this.favoris = 0;
    this.aVoir = 0;
    this.enCours = 0;
    this.termines = 0;
    this.enAttente = 0;
    this.comments = 0;
  }

  async ngOnInit() {
    const favoris = await this.userService.getNbFavoris();
    this.favoris = favoris.body;
    const aVoir = await this.userService.getNbAVoir();
    this.aVoir = aVoir.body;
    const enCours = await this.userService.getNbEnCours();
    this.enCours = enCours.body;
    const termines = await this.userService.getNbTermines();
    this.termines = termines.body;
    const enAttente = await this.userService.getNbEnAttente();
    this.enAttente = enAttente.body;
    const comments = await this.userService.getNbComments();
    this.comments = comments.body;
    const ctx = document.getElementById('myChart') as ChartItem;
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['A voir', 'En cours', 'Terminés', 'En attente'],
        datasets: [{
          data: [this.aVoir, this.enCours, this.termines, this.enAttente],
          backgroundColor: [
            '#f0e36b',
            '#00b8c0',
            '#ff473f', '#7f00ff'
          ],
        }]
      },
    })

  }

}
