import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  nbUser: number;
  nbAdmin: number;

  constructor() {
    this.nbUser = 10;
    this.nbAdmin = 3
  }

  ngOnInit(): void {
    const ctx = document.getElementById('myChart') as ChartItem;
    const myChart = new Chart(ctx, {
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
