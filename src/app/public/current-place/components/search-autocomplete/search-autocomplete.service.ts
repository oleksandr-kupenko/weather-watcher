import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { searchResultMock } from './search.mock';
import { PlaceAutoCompletePrediction } from './search-autocomplete.interfaces';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchAutocompleteService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getPlacePredictions(input: string | null): Observable<PlaceAutoCompletePrediction[]> {
    if (!input) {
      return of([]);
    }
    return this.http.get<PlaceAutoCompletePrediction[]>(
      `${this.apiBaseUrl}/locations/v1/cities/autocomplete?q=${input}`,
    );
  }
}
