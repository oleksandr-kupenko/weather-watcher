import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { CurrentPlaceWithWeather } from './current-weather.interface';
import { Store } from '@ngrx/store';
import { selectCurrentPlaceCurrentData } from '../../store/current-place.selectors';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'current-place-weather',
  standalone: true,
  imports: [MatIcon, MatIconButton, NgIf, AsyncPipe, NgOptimizedImage, MatTooltip],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit {
  currentPlaceWithWeather: CurrentPlaceWithWeather | null = null;
  favorites: string[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.getCurrentPlaceFromStore();
  }

  handleIsFavorite(key: string): boolean {
    return this.favorites.includes(key);
  }

  toggleFavorite(city: string) {
    const index = this.favorites.indexOf(city);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(city);
    }
  }

  getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char: string) => 127397 + char.codePointAt(0)!);
    return String.fromCodePoint(...codePoints);
  }

  private getCurrentPlaceFromStore() {
    this.store.select(selectCurrentPlaceCurrentData).subscribe((data) => {
      this.currentPlaceWithWeather = data;
    });
  }
}
