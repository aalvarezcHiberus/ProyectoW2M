import { Component, EventEmitter, Output } from '@angular/core';
import { HeroModel } from 'src/app/shared/models/heroes/hero';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent {
  @Output() dataEmit = new EventEmitter<Array<HeroModel>>();

  constructor(private readonly heroService: HeroesService) {}

  getDataById(id: number) {
    this.heroService.getSuperHeroesByIdRXJS(id).subscribe(res => this.dataEmit.emit(res? [res] : []));
  }
  getDataByName(name: string) {
    this.heroService.getSuperHeroesByName(name).subscribe(res => this.dataEmit.emit(res));
  }
}
