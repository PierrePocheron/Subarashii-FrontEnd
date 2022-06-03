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

  constructor(private userService: UserService) {
    this.favoris = 0;
    this.aVoir = 0;
    this.enCours = 0;
    this.termines = 0;
    this.enAttente = 0;
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
    const ctx = document.getElementById('myChart') as ChartItem;
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['A voir', 'En cours', 'Terminés', 'En attente'],
        datasets: [{
          data: [this.aVoir, this.enCours, this.termines, this.enAttente],
          backgroundColor: [
            'rgb(255,71,63)',
            'rgb(194,0,27)',
            'blue', 'green'
          ],
        }]
      },
    })

  }

}
