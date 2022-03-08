import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.css'],
})
export class AnimesListComponent implements OnInit {
  public myList: any[] = [];
  public basicList: string[] = ['En cours', 'A voir', 'Terminé', 'En attente'];
  public animeList: any[] = [];
  name = new FormControl('');
  constructor(private listS: ListService, private datePipe: DatePipe) {}

  async ngOnInit() {
    await this.getMyList();
    const idAvoir: any = this.myList.filter((el) => el.nom == 'A voir');

    await this.getAnimeList(idAvoir[0].id);
  }

  async getMyList() {
    this.myList = await this.listS.getMyList();
  }

  async addList() {
    const name = this.name.value;
    const data = await this.listS.addList({ nom: name });
    this.name.setValue('');
    await this.getMyList();
  }

  async getAnimeList(idList: number) {
    if (!this.animeList[idList]) {
      this.animeList[idList] = await this.listS.getAnimeList(idList);
    }
  }

  changeDate(date: Date): any {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
