import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient ) { }

  // devuelve un pais o null
  // si NO hay resultados de busqueda, da un array vacio y por lo tanto se muestra el alert de no hay resultados
  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) ) 
      );
  }

  // si NO hay resultados de busqueda, da un array vacio y por lo tanto se muestra el alert de no hay resultados
  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ) 
      );
  }

// si NO hay resultados de busqueda, da un array vacio y por lo tanto se muestra el alert de no hay resultados
  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ) 
      );
  }

  // si NO hay resultados de busqueda, da un array vacio y por lo tanto se muestra el alert de no hay resultados
  searchRegion( region: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ) 
      );
  }


}
