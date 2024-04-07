import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { searchResultMock } from './search.mock';
import { PlaceAutoCompletePrediction } from './search-autocomplete.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SearchAutocompleteService {
  private apiKey = 'ur2EzZIFTszrCMATM2goNKe9e3H4BJqy';

  constructor(private http: HttpClient) {}

  getPlacePredictions(input: string | null): Observable<PlaceAutoCompletePrediction[]> {
    if (!input) {
      return of([]);
    }
    return of(searchResultMock);
    //todo try change to params object
    // return this.http
    //   .get<{
    //     predictions: PlaceAutoCompletePrediction[];
    //   }>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${input}`)
    //   .pipe(map((response: any) => response.predictions));
  }
}
