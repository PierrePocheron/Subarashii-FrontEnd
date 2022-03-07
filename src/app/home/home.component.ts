import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private page: number = 1;
  private search: any = {};
  private include_adult: boolean = false;
  private totalPage: number = 1;
  public dataObject: any = {};
  public animes: any = [];
  public toutPublic: boolean = true;
  public adult: boolean = false;
  public orderBy = '';
  private url = 'fullsearch';
  public isSearch: boolean = false;
  constructor(
    private apiA: AnimeService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<any> {
    const params = await firstValueFrom(this.route.queryParams);
    const { search } = params;
    if (search) {
      this.isSearch = true;
      this.url = 'search';
      return await this.getAllAnime({ query: search });
    }
    await this.getAllAnime(this.mergeObject());
  }

  async getAllAnime(data: object = {}) {
    if (this.totalPage >= this.page) {
      const dataObject: any = await this.apiA.get(this.url, data);
      this.animes = this.animes.concat(dataObject.body.results);
      this.totalPage = dataObject.body.total_pages;
      ++this.page;
    }
  }

  mergeObject() {
    const data = {
      ...{ sort_by: this.orderBy },
      ...{ page: this.page },
      ...{ include_adult: this.include_adult },
    };
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
        this.include_adult = false;
        this.toutPublic = true;
        this.adult = false;
      } else {
        this.include_adult = true;
        this.toutPublic = false;
        this.adult = true;
      }
    }
    if (event.target.id == 'adulte') {
      if (event.target.checked) {
        this.include_adult = true;
        this.adult = true;
        this.toutPublic = false;
      } else {
        this.include_adult = false;
        this.toutPublic = true;
        this.adult = false;
      }
    }
    await this.getAllAnime(await this.mergeObject());
  }

  changeDate(date: Date): any {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
