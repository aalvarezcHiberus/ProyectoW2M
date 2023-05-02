import { HeroDTO, SuperpoderModel } from "./hero.dto";

export class HeroModel {
    id?: number;
    nombre: string;
    alterego?: string;
    sexo?: string;
    superpoder: SuperpoderModel[];
    debilidades?: string;
    humano?: boolean;

    constructor(hero: HeroDTO) {
      this.id = hero.id;
      this.nombre = hero.nombre;
      this.alterego = hero.alterego;
      this.sexo = hero.sexo;
      this.superpoder = hero.superpoder;
      this.debilidades = hero.debilidades;
      this.humano = hero.humano;
    }
  }