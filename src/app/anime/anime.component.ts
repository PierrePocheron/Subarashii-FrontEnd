import { ListService } from './../services/list.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AnimeService } from './../services/anime.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  anime: any = {};
  idAnime: any = 0;
  public saisons: any[] = [];
  public episodesView: any[] = [];
  public userLists: any[] = [];
  public myAnimeIdSeeList: number[] = [];
  constructor(
    private animeS: AnimeService,
    private listS: ListService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.idAnime = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    const data: any = await this.animeS.get(this.idAnime);
    this.anime = data.body;
    for (let index = 0; index < this.anime.nbSaison; index++) {
      this.saisons.push({
        nbSaison: index + 1,
        episodes: [],
      });
    }
    await this.getEpisodeViews();
    this.episodesView = this.episodesView.map((el) => el.idApiEpisode);
    await this.getMyList();
    this.myAnimeIdSeeList = await this.listS.myAnimeIdSeeList();
  }

  changeDate(date: Date): any {
    return this.datePipe.transform(date, 'yyyy');
  }

  async getEpisodesSaison(idSaison: number = 1) {
    if (this.saisons[idSaison - 1].episodes.length == 0) {
      const data = await this.animeS.getEpisodesSaison(
        this.anime.idApi,
        idSaison
      );
      this.saisons[idSaison - 1].episodes = data;
    }
  }

  async changeStateViewEpisode(event: any, idEpisode: number) {
    const data = await this.listS.changeStateViewEpisode(
      this.anime.idApi,
      idEpisode
    );
    const target = event.target;
    var element = target.getElementsByTagName('img')[0];
    if (target.tagName == 'IMG') {
      element = target;
    }
    if (data) {
      element.src = '../../assets/img/SVG/see.svg';
    } else {
      element.src = '../../assets/img/SVG/notseen.svg';
    }
  }

  async getEpisodeViews() {
    this.episodesView = await this.listS.getEpisodeViews(this.anime.idApi);
  }

  async getMyList() {
    this.userLists = await this.listS.getMyList();
  }

  async addAnimeList(idAnime: number, idList: number) {
    const data = await this.listS.addAnimeList(idAnime, idList);
    this.myAnimeIdSeeList.push(idAnime);
  }
}
