import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  search: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'];
    });
  }

  async ngOnInit() {}

  onEnter() {
    this.router
      .navigate(['/'], { queryParams: { search: this.search } })
      .then(() => {
        window.location.reload();
      });
  }
}
