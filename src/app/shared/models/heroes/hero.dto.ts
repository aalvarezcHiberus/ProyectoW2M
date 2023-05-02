export interface HeroDTO {
    id?: number;
    nombre: string;
    alterego?: string;
    sexo?: string;
    superpoder: SuperpoderModel[];
    debilidades?: string;
    humano?: boolean;
  }

  export interface SuperpoderModel {
    key: string;
    value: string;
  }

  export const Superpoder: SuperpoderModel[] = [
    {key: "Vuelo", value: "Vuelo"},
    {key: "Fuerza", value: "Fuerza"},
    {key: "Velocidad", value: "Velocidad"},
    {key: "Agilidad", value: "Agilidad"},
    {key: "Rayos laser", value: "Rayos laser"},
  ]