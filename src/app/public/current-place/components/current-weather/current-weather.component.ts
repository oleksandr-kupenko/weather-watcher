import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { CurrentPlaceWithWeather } from './current-weather.interface';
import { Store } from '@ngrx/store';
import { selectCurrentPlaceCurrentData } from '../../store/current-place.selectors';
import { MatTooltip } from '@angular/material/tooltip';
import { pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'current-place-weather',
  standalone: true,
  imports: [MatIcon, MatIconButton, NgIf, AsyncPipe, NgOptimizedImage, MatTooltip, MatButtonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit {
  public currentPlaceWithWeather: CurrentPlaceWithWeather | null = null;
  favorites: string[] = [];

  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit() {
    this.getCurrentPlaceFromStore();
  }

  getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char: string) => 127397 + char.codePointAt(0)!);
    return String.fromCodePoint(...codePoints);
  }

  private getCurrentPlaceFromStore() {
    this.store.select(selectCurrentPlaceCurrentData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
      this.currentPlaceWithWeather = data;
    });
  }
}
