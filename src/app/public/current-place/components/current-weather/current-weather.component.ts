import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentPlaceCurrentData } from '../../store/current-place.selectors';
import { MatTooltip } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaceWithCurrentWeather } from '../../../public.interfaces';
import { EmojiFlagComponent } from '../../../shared/components/emoji-flag.component';
import { AccuweatherIconComponent } from '../../../shared/components/accuweather-icon.component';

@Component({
  selector: 'current-place-weather',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    MatTooltip,
    MatButtonModule,
    EmojiFlagComponent,
    AccuweatherIconComponent,
  ],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit {
  public currentPlaceWithWeather: PlaceWithCurrentWeather | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit() {
    this.getCurrentPlaceFromStore();
  }

  private getCurrentPlaceFromStore() {
    this.store
      .select(selectCurrentPlaceCurrentData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.currentPlaceWithWeather = data;
      });
  }
}
