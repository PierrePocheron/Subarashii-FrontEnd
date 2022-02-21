import { ThrowStmt } from '@angular/compiler';
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
  private search: any = {};
  public orderBy = 'title';
  public sort = 'ASC';
  private order: any = {};
  private sfw: any = false;
  public toutPublic = true;
  public adult = false;

  constructor(private apiA: ApiAnimeService) {}

  async ngOnInit(): Promise<any> {
    this.order = {
      order_by: this.orderBy,
      sort: this.sort,
    };
    await this.getAllAnime(await this.mergeObject());
  }

  async getAllAnime(data: object = {}) {
    if (this.pagination.has_next_page) {
      const dataObject: any = await this.apiA.get('anime', data);
      this.animes = this.animes.concat(dataObject.data);
      this.pagination = dataObject.pagination;
      ++this.page;
    }
  }

  async mergeObject() {
    const data = await {
      ...this.order,
      ...{ page: this.page },
      ...this.search,
      ...{ sfw: this.sfw },
    };
    if (this.sfw) delete data.sfw;
    return data;
  }

  async onScroll() {
    await this.getAllAnime(await this.mergeObject());
  }

  resetValue() {
    this.animes = [];
    this.page = 1;
  }

  async changeStatus(event: any, status: string) {
    this.resetValue();
    delete this.search.status;
    if (event.target.checked) {
      if (this.search.statusTarget) {
        this.search.statusTarget.checked = false;
      }
      this.search.statusTarget = event.target;
      this.search.status = status;
    } else {
      delete this.search.statusTarget;
    }
    await this.getAllAnime(await this.mergeObject());
  }

  async changeRating(event: any) {
    this.resetValue();
    if (event.target.id == 'toutPublic') {
      if (event.target.checked) {
        this.sfw = false;
        this.toutPublic = true;
        this.adult = false;
      } else {
        this.sfw = true;
        this.toutPublic = false;
        this.adult = true;
      }
    }
    if (event.target.id == 'adulte') {
      if (event.target.checked) {
        this.sfw = true;
        this.adult = true;
        this.toutPublic = false;
      } else {
        this.sfw = false;
        this.toutPublic = true;
        this.adult = false;
      }
    }
    await this.getAllAnime(await this.mergeObject());
  }
}
