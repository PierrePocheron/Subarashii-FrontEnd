import { Component, OnInit } from '@angular/core';
import { ApiAnimeService } from '../services/api-anime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public dataObject: any = {};
  public animes: any = [];
  public pagination: any = {
    has_next_page: true,
  };
  private page = 1;
  constructor(private apiA: ApiAnimeService) {}

  async ngOnInit(): Promise<any> {
    await this.getAllAnime();
  }

  async getAllAnime(data: object = {}) {
    if (this.pagination.has_next_page) {
      const dataObject: any = await this.apiA.get('anime', data);
      this.animes = this.animes.concat(dataObject.data);
      this.pagination = dataObject.pagination;
      ++this.page;
    }
  }

  async onScroll() {
    // ! Add if search, type....
    await this.getAllAnime({ page: this.page });
  }
}
