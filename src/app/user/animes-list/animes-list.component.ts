import { firstValueFrom } from 'rxjs';
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
  public name = new FormControl('');
  public messageModal: string =
    'Voulez-vous valider la suppression de cette liste ?';
  public idListToDelete: number = 0;
  public idListSelected = 0;
  public idList = 0;
  constructor(private listS: ListService, private datePipe: DatePipe) {}

  async ngOnInit() {
    await this.getMyList();
    const idAvoir: any = this.myList.filter((el) => el.nom == 'A voir');

    await this.getAnimeList(idAvoir[0].id);
    this.initializeIdList(idAvoir[0].id);
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
    this.idList = idList;
    if (!this.animeList[idList]) {
      this.animeList[idList] = await this.listS.getAnimeList(idList);
    }
  }

  changeDate(date: Date): any {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  async initializeModal(idList: number) {
    this.idListToDelete = idList;
    await this.getAnimeList(idList);
    if (this.animeList[idList].length !== 0) {
      this.messageModal =
        'Êtes vous sûr de vouloir supprimer cette liste ? Les animés présents dans votre liste seront également supprimés de celle-ci.';
    }
  }

  initializeIdList(idList: number) {
    this.idList = idList;
  }
  async deleteList() {
    await this.listS.deleteList(this.idListToDelete);
    await this.getMyList();
  }

  async deleteAnimeList(idAnime: number) {
    await this.listS.deleteAnimeList(idAnime, this.idList);
    this.animeList[this.idList] = this.animeList[this.idList].filter(
      (el: any) => el.idApi != idAnime
    );
  }
}
