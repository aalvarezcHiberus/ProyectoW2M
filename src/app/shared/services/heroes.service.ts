import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HeroModel } from '../models/heroes/hero';
import { ENDPOINTS } from 'src/app/core/config/constants';
import { environment } from './../../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getSuperHeroes(page: number, limit: number): Observable<Array<HeroModel>> {
    const params = new HttpParams()
    .append('_page', page)
    .append('_limit', limit);

    return this.http.get<Array<HeroModel>>(`${environment.apiUrl}${ ENDPOINTS.HEROES }`, {params});
  }

  getAllSuperHeroes(): Observable<Array<HeroModel>> {
    return this.http.get<Array<HeroModel>>(`${environment.apiUrl}${ ENDPOINTS.HEROES }`);
  }

  getSuperHeroesByIdRXJS(id: number): Observable<HeroModel | undefined>{
    return this.http.get<Array<HeroModel>>(`${environment.apiUrl}${ ENDPOINTS.HEROES }`).pipe(
      map((heroList: HeroModel[]) => heroList.find((hero: HeroModel) => hero.id === id))
    );
  }

  getSuperHeroesByName(name: string): Observable<HeroModel[] | undefined>{
    return this.http.get<Array<HeroModel>>(`${environment.apiUrl}${ ENDPOINTS.HEROES }`).pipe(
      map((heroList: HeroModel[]) => heroList.filter((hero: HeroModel) => hero.nombre.toLocaleLowerCase().includes(name.toLocaleLowerCase())))
    );
  }

  addSuperHeroe(hero: HeroModel): Observable<HeroModel | undefined>{
    return this.http.post<HeroModel>(`${environment.apiUrl}${ ENDPOINTS.HEROES }`, hero);
  }

  updateSuperHeroe(hero: HeroModel): Observable<HeroModel | undefined>{
    return this.http.put<HeroModel>(`${environment.apiUrl}${ ENDPOINTS.HEROES}/${ hero.id }`, hero);
  }

  deleteHeroById(id: string): Observable<HeroModel[]> {
    return this.http.delete<Array<HeroModel>>(`${environment.apiUrl}${ ENDPOINTS.HEROES }/${id}`);
  }
}
