import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from './../services/comment.service';
import { ListService } from './../services/list.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnimeService } from './../services/anime.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  public anime: any = {};
  public idAnime: any = 0;
  public saisons: any[] = [];
  public episodesView: any[] = [];
  public userLists: any[] = [];
  public myAnimeIdSeeList: number[] = [];
  public comment = new FormControl('');
  public comments: any[] = [];
  public username: string = '';
  @ViewChild('episodesBtn') episodesBtn: ElementRef | undefined;
  @ViewChild('commentsBtn') commentsBtn: ElementRef | undefined;

  constructor(
    private animeS: AnimeService,
    private listS: ListService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private commentS: CommentService,
    private router: Router,
    private authS: AuthService
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
    this.episodesView = await this.episodesView.map((el) => el.idApiEpisode);
    await this.getMyList();
    this.myAnimeIdSeeList = await this.listS.myAnimeIdSeeList();
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    const url = await this.router.url;
    const element = url.substring(url.indexOf('#') + 1);
    if (element == 'episodes') {
      this.episodesBtn?.nativeElement.click();
    }
    if (element == 'comments') {
      this.commentsBtn?.nativeElement.click();
    }
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
    await this.listS.addAnimeList(idAnime, idList);
    this.myAnimeIdSeeList.push(idAnime);
  }

  async getComment() {
    this.username = this.authS.userConnected();
    this.comments = await this.commentS.getComment(this.idAnime);
  }

  async addComment() {
    const data = {
      contenu: this.comment.value,
      idApiAnime: this.idAnime,
    };
    await this.commentS.addComment(data);
    this.comment.setValue('');
    this.getComment();
  }
}
