import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

interface CurrentWeather {
  city: string;
  temperature: number;
}

interface ForecastDay {
  date: Date;
  temperature: number;
  description: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchQuery = '';
  currentWeather: CurrentWeather | null = null;
  forecast: ForecastDay[] = [];
  favorites: string[] = [];

  constructor() {
    // Инициализация моков данных
    this.currentWeather = {
      city: 'Kyiv',
      temperature: 20
    };

    this.forecast = [
      {
        date: new Date('2023-06-10'),
        temperature: 22,
        description: 'Sunny'
      },
      {
        date: new Date('2023-06-11'),
        temperature: 24,
        description: 'Partly cloudy'
      },
      {
        date: new Date('2023-06-12'),
        temperature: 19,
        description: 'Rainy'
      },
      {
        date: new Date('2023-06-13'),
        temperature: 21,
        description: 'Cloudy'
      },
      {
        date: new Date('2023-06-14'),
        temperature: 23,
        description: 'Sunny'
      }
    ];
  }

  searchCity() {
    console.log('Searching city:', this.searchQuery);
  }

  toggleFavorite(city: string) {
    const index = this.favorites.indexOf(city);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(city);
    }
  }

  isFavorite(city: string): boolean {
    return this.favorites.includes(city);
  }
}
