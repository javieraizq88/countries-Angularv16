import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        // switchMap recibe el valor anterior y devuelve un Observable
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )), 
      )
      .subscribe( country => {
        // si el pais no existe, redirecciona a home
        if ( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }




}
