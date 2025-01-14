
import { Country } from './country';
import { Region } from './region.type';

export interface CacheStore {
  byCapital:   TermCountries; // termino de busqueda de capitales
  byCountries: TermCountries; // termino de busqueda de paises
  byRegion:    RegionCountries; // termino de busqueda de regiones
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region:    Region;
  countries: Country[];
}
