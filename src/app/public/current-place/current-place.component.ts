import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { CurrentPlaceService } from './current-place.service';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { Store } from '@ngrx/store';
import { PlaceAutoCompletePrediction } from './components/search-autocomplete/search-autocomplete.interfaces';
import { CurrentPlaceReducers } from './store/current-place.actions';

interface ForecastDay {
  date: Date;
  temperature: number;
  description: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    SearchAutocompleteComponent,
    CurrentWeatherComponent,
  ],
  templateUrl: './current-place.component.html',
  styleUrl: './current-place.component.scss',
})
export class CurrentPlaceComponent {
  searchQuery = '';

  forecast: ForecastDay[] = [];

  constructor(
    private placeDetailsService: CurrentPlaceService,
    private store: Store,
  ) {
    this.forecast = [
      {
        date: new Date('2023-06-10'),
        temperature: 22,
        description: 'Sunny',
      },
      {
        date: new Date('2023-06-11'),
        temperature: 24,
        description: 'Partly cloudy',
      },
      {
        date: new Date('2023-06-12'),
        temperature: 19,
        description: 'Rainy',
      },
      {
        date: new Date('2023-06-13'),
        temperature: 21,
        description: 'Cloudy',
      },
      {
        date: new Date('2023-06-14'),
        temperature: 23,
        description: 'Sunny',
      },
    ];
  }

  searchCity() {
    console.log('Searching city:', this.searchQuery);
  }

  public handlePlaceSelected(place: PlaceAutoCompletePrediction) {
    this.store.dispatch(
      CurrentPlaceReducers.setCurrentPlace({
        key: place.Key,
        name: place.LocalizedName,
        countryData: place.Country,
      }),
    );

    this.store.dispatch(CurrentPlaceReducers.getCurrentPlaceWeather({ key: place.Key }));

    //this.store.dispatch(CurrentPlaceReducers.getCurrentPlaceInfo({ googlePlaceId: place.place_id }));
    // this.placeDetailsService.getPlaceDetails(place.place_id).subscribe((placeDetails) => {
    //   console.log('DETAILS', placeDetails);
    //   this.placeDetailsService.getPhoto(placeDetails.photos[0].photo_reference).subscribe((photoUrl) => {
    //     console.log('PHOTO URL', photoUrl);
    //   });
    // });
  }
}
