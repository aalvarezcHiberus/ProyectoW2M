import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { forkJoin, tap } from 'rxjs';
import {
  HttpClientTestingModule, HttpTestingController,
} from '@angular/common/http/testing';
import { HeroModel } from '../models/heroes/hero';
import { Superpoder } from '../models/heroes/hero.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { ENDPOINTS } from 'src/app/core/config/constants';

describe('Prueba a HeroService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroService: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService],
      imports: [HttpClientTestingModule]
    });
  
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('-getAllHeroes', () => {

    beforeEach(() => {
      heroService = TestBed.inject(HeroesService);
    });

    it('should be created', () => {
      expect(heroService).toBeTruthy();
    });

    it('should return expected heroes (called once)', () => {
      heroService
        .getAllSuperHeroes()
        .subscribe({
          next: heroes => expect(heroes.length).toBe(7),
          error: fail
          }
        );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${environment.apiUrl}${ ENDPOINTS.HEROES }`);
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('-addHero', () => {

    beforeEach(() => {
      heroService = TestBed.inject(HeroesService);
    });

    it('should be created', () => {
      expect(heroService).toBeTruthy();
    });

    it('should return correct length', () => {
      const hero: HeroModel = {nombre:'prueba', alterego:'', debilidades: '', humano: true, sexo: '', superpoder: [Superpoder[1]]};

      forkJoin({
        allAfter: heroService.getAllSuperHeroes(),
        add: heroService.addSuperHeroe(hero),
        allBefore: heroService.getAllSuperHeroes()})
      .subscribe({
        next: heroes => {
          const lengthAfter = heroes.allAfter.length;
          const lengthBefore = heroes.allBefore.length;
          expect(lengthBefore).toBe(lengthAfter + 1);
        },
        error: fail
      });

      // HeroService should have made one request to POST hero from expected URL
      const req = httpTestingController.match(`${environment.apiUrl}${ ENDPOINTS.HEROES }`);
      expect(req[0].request.method).toEqual('GET');
      expect(req[1].request.method).toEqual('POST');
      expect(req[1].request.body).toEqual(hero);
      expect(req[2].request.method).toEqual('GET');
    });
  });

  describe('-getHeroById', () => {

    beforeEach(() => {
      heroService = TestBed.inject(HeroesService);
    });

    it('should be created', () => {
      expect(heroService).toBeTruthy();
    });

    it('should return expected hero (called once)', () => {
      const hero: HeroModel = {id: 100, nombre:'prueba', alterego:'', debilidades: '', humano: true, sexo: '', superpoder: [Superpoder[0]]};
    
      forkJoin({
        add: heroService.addSuperHeroe(hero),
        get: heroService.getSuperHeroesByIdRXJS(100)})
        .subscribe({
          next: hero => {
            const addHero = hero.get;
            expect(addHero?.id).toBe(100);
          },
          error: fail
        });

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.match(`${environment.apiUrl}${ ENDPOINTS.HEROES }`);
      expect(req[0].request.method).toEqual('POST');
      expect(req[0].request.body).toEqual(hero);
      expect(req[1].request.method).toEqual('GET');
    });
  });

  describe('-updateHero', () => {

    beforeEach(() => {
      heroService = TestBed.inject(HeroesService);
    });

    it('should be created', () => {
      expect(heroService).toBeTruthy();
    });

    it('should return expected hero (called once)', () => {
      const hero: HeroModel = {id: 100, nombre:'prueba', alterego:'', debilidades: '', humano: true, sexo: '', superpoder: [Superpoder[0]]};
      const updatedHero: HeroModel = {id: 100, nombre:'pruebaModificado', alterego:'', debilidades: '', humano: true, sexo: '', superpoder: [Superpoder[0]]};
    
      forkJoin({
        add: heroService.addSuperHeroe(hero),
        update: heroService.updateSuperHeroe(updatedHero),
        get: heroService.getSuperHeroesByIdRXJS(100)})
        .subscribe({
          next: hero => {
            const addHero = hero.get;
            expect(addHero).toEqual(updatedHero);
          },
          error: fail
        });

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.match(`${environment.apiUrl}${ ENDPOINTS.HEROES }`);
      expect(req[0].request.method).toEqual('POST');
      expect(req[0].request.body).toEqual(hero);
      expect(req[1].request.method).toEqual('GET');

      const updateReq = httpTestingController.match(`${environment.apiUrl}${ ENDPOINTS.HEROES}/${ hero.id }`);
      expect(updateReq[0].request.method).toEqual('PUT');
      expect(updateReq[0].request.body).toEqual(updatedHero);
    });
  });

  describe('-deleteHero', () => {

    beforeEach(() => {
      heroService = TestBed.inject(HeroesService);
    });

    it('should be created', () => {
      expect(heroService).toBeTruthy();
    });

    it('should return no hero (called once)', () => {
      const hero: HeroModel = {id: 100, nombre:'prueba', alterego:'', debilidades: '', humano: true, sexo: '', superpoder: [Superpoder[0]]};
    
      forkJoin({
        add: heroService.addSuperHeroe(hero),
        delete: heroService.deleteHeroById('100')})
        .subscribe({
          next: () => {
            const addHero = heroService.getSuperHeroesByIdRXJS(100);
            expect(addHero).toBeUndefined();
          },
          error: fail
        });

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.match(`${environment.apiUrl}${ ENDPOINTS.HEROES }`);
      expect(req[0].request.method).toEqual('POST');
      expect(req[0].request.body).toEqual(hero);
      const deleteReq = httpTestingController.match(`${environment.apiUrl}${ ENDPOINTS.HEROES }/${hero.id}`);
      expect(deleteReq[0].request.method).toEqual('DELETE');
    });
  });
});
