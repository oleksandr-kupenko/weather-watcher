import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { UiSettingsActions } from './shared/ui-settings/store/ui-settings.actions';
import { selectDarkModeStatus } from './shared/ui-settings/store/ui-serrings.selectors';
import { AsyncPipe } from '@angular/common';
import { selectIsFavorite } from './favorites/store/favorites.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-public-wrapper',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatAnchor,
    MatSlideToggle,
    MatToolbar,
    RouterLink,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './public-wrapper.component.html',
  styleUrl: './public-wrapper.component.scss',
})
export class PublicWrapperComponent {
  isDarkTheme$ = this.store.select(selectDarkModeStatus);

  constructor(private store: Store) {}

  public handleChangeTheme(value: boolean) {
    this.store.dispatch(UiSettingsActions.setDarkModeStatus({ status: value }));
  }

  // private checkIsDarkMode(key: string) {
  //   this.store
  //     .select(selectIsFavorite)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe((isFavorite) => {
  //       this.isFavoritePlace = isFavorite;
  //     });
  // }
}
