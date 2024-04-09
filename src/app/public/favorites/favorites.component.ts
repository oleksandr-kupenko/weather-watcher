import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FavoritesActions } from './store/favorites.actions';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { selectFavoriteLoadingStatus, selectFavoritesPlaces } from './store/favorites.selectors';
import { PlaceWithCurrentWeather } from '../public.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccuweatherIconComponent } from '../shared/components/accuweather-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { CurrentPlaceActions } from '../current-place/store/current-place.actions';
import { selectCurrentPlaceCurrentData } from '../current-place/store/current-place.selectors';
import { take } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EmojiFlagComponent } from '../shared/components/emoji-flag.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    AccuweatherIconComponent,
    MatButtonModule,
    RouterLink,
    MatProgressSpinner,
    EmojiFlagComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  public isLoading = this.store.select(selectFavoriteLoadingStatus);

  public favoritePlaces: PlaceWithCurrentWeather[] = this.route.snapshot.data['savedFavorites'];

  private destroyRef = inject(DestroyRef);
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscribeToUpdatesFavoritePlaces();
    this.subscribeToUpdatesCurrentPlace();
    if (this.favoritePlaces) {
      this.store.dispatch(FavoritesActions.getFavoritesWeather({ places: this.favoritePlaces }));
    }
  }

  public handleRemovePlace(key: string) {
    this.store.dispatch(FavoritesActions.removePlace({ key }));
  }

  public handleOpenDetails(place: PlaceWithCurrentWeather) {
    this.store.dispatch(
      CurrentPlaceActions.setCurrentPlace({ key: place.key, name: place.name, countryData: place.countryData }),
    );
    this.router.navigate(['/home', place.key]);
  }

  private subscribeToUpdatesFavoritePlaces() {
    this.store
      .select(selectFavoritesPlaces)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((places) => {
        this.favoritePlaces = places;
      });
  }

  private subscribeToUpdatesCurrentPlace() {
    this.store
      .select(selectCurrentPlaceCurrentData)
      .pipe(take(1))
      .subscribe((place) => {
        console.log('NEW PLACE', place);
      });
  }
}
