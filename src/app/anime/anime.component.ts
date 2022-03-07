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
  constructor(
    private animeS: AnimeService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.idAnime = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    const data: any = await this.animeS.get(this.idAnime);
    this.anime = data.body;
    console.log(this.anime);
  }

  changeDate(date: Date): any {
    return this.datePipe.transform(date, 'yyyy');
  }
}
