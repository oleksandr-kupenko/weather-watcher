import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FavoritesActions } from './store/favorites.actions';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  public favoritePlaces = this.route.snapshot.data['savedFavorites'];
  constructor(
    private store: Store,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.favoritePlaces) {
      this.store.dispatch(FavoritesActions.getFavoritesWeather({ places: this.favoritePlaces }));
    }
  }
}
