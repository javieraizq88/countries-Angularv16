
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  // term -> palabras que se estan buscando
  public cacheStore: CacheStore = { // TODO: guarda la información de la busqueda y no se borran los resultados al cambiar de url
    byCapital:   { term: '', countries: [] }, // va a guardar la informacion de los paises mostrados segun la busqueda que coincide con la capital
    byCountries: { term: '', countries: [] }, // va a guardar la informacion de los paises mostrados segun la busqueda que coincide con el pais
    byRegion:    { region: '', countries: [] }, // va a guardar la informacion de los paises mostrados segun la busqueda que coincide con la region
  }

  constructor(private http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        // delay( 2000 ),
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

// term -> palabras que se estan buscando
  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url)
        .pipe(
          tap( countries => this.cacheStore.byCapital = { term, countries }),
          tap( () => this.saveToLocalStorage() ),
        );
  }

  // term -> palabras que se estan buscando
  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries }),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }),
        tap( () => this.saveToLocalStorage() ),
      );
  }


}
