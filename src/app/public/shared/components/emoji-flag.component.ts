import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-emoji-flag',
  standalone: true,
  imports: [MatTooltipModule],
  template: ` <span class="current-weather__city-info--info" [matTooltip]="tooltip">{{
    getFlagEmoji(countryCode)
  }}</span>`,
  styles: [
    `
      :host {
        display: inline-block;
        margin-left: 5px;
      }
    `,
  ],
})
export class EmojiFlagComponent {
  @Input() tooltip = '';
  @Input() countryCode = '';

  getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char: string) => 127397 + char.codePointAt(0)!);
    return String.fromCodePoint(...codePoints);
  }
}
