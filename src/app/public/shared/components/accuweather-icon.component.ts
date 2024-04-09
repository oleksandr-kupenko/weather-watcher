import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accuweather-icon',
  standalone: true,
  imports: [],
  template: `<img [src]="'assets/img/weather-icons/' + iconNumber + '.png'" [alt]="alt" /> `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        img {
          width: 100%;
        }
      }
    `,
  ],
})
export class AccuweatherIconComponent {
  @Input() iconNumber!: number | null;
  @Input() alt!: string;
}
