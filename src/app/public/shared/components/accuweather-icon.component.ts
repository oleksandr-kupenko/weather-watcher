import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accuweather-icon',
  standalone: true,
  imports: [],
  template: `<img
    [src]="'https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/' + iconNumber + '-s.png'"
    [alt]="alt"
  />
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class AccuweatherIconComponent {
  @Input() iconNumber!: number | null;
  @Input() alt!: string;
}
