import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../services/anime.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private page = 1;
  private search: any = {};
  private order: any = {};
  private sfw: any = false;
  private totalPage = 1;
  public dataObject: any = {};
  public animes: any = [];
  public toutPublic = true;
  public adult = false;
  public orderBy = 'title';
  public sort = 'ASC';

  constructor(private apiA: AnimeService, private datePipe: DatePipe) {}

  async ngOnInit(): Promise<any> {
    this.order = {
      order_by: this.orderBy,
      sort: this.sort,
    };
    await this.getAllAnime(await this.mergeObject());
  }

  async getAllAnime(data: object = {}) {
    if(this.totalPage >= this.page) {
      const dataObject: any = await this.apiA.get('discover/' + this.page, data);
      this.animes = this.animes.concat(dataObject.body.results);
      console.log(dataObject.body)
      this.totalPage = dataObject.body.total_pages;
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

  changeDate(date: Date): any {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
