import { Component, isDevMode, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDarkModeStatus } from './public/shared/ui-settings/store/ui-serrings.selectors';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OverlayModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private store: Store,
    private overlayContainer: OverlayContainer,
  ) {}

  ngOnInit() {
    this.subscribeToDarkModeStatus();
  }

  private subscribeToDarkModeStatus() {
    this.store.select(selectDarkModeStatus).subscribe((isDarkTheme) => {
      if (isDarkTheme) {
        this.renderer.addClass(document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(document.body, 'dark-theme');
      }
    });
  }
}
