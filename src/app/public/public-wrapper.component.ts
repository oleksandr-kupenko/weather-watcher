import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-public-wrapper',
  standalone: true,
  imports: [RouterOutlet, MatAnchor, MatSlideToggle, MatToolbar, RouterLink, FormsModule],
  templateUrl: './public-wrapper.component.html',
  styleUrl: './public-wrapper.component.scss',
})
export class PublicWrapperComponent {
  isDarkTheme = false;
}
