import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { debounceTime, distinctUntilChanged, filter, finalize, Observable, startWith, switchMap, tap } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { PlaceAutoCompletePrediction } from './search-autocomplete.interfaces';
import { SearchAutocompleteService } from './search-autocomplete.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { correctSymbolsValidator } from './search-autocomplete.validator';

@Component({
  selector: 'app-search-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './search-autocomplete.component.html',
  styleUrl: './search-autocomplete.component.scss',
})
export class SearchAutocompleteComponent implements OnInit {
  @Output() onPlaceSelected = new EventEmitter<PlaceAutoCompletePrediction>();

  public isDataLoading = false;

  public searchControl = new FormControl('', { validators: [correctSymbolsValidator()], updateOn: 'change' });
  public predictions$!: Observable<PlaceAutoCompletePrediction[]>;

  constructor(private searchAutocompleteService: SearchAutocompleteService) {}

  ngOnInit() {
    this.searchControl.markAsTouched();
    this.initAutocomplete();
  }

  public handleGetOptionText(place: PlaceAutoCompletePrediction) {
    return !place ? '' : place.LocalizedName;
  }

  public handlePlaceSelected(event: MatAutocompleteSelectedEvent) {
    this.onPlaceSelected.emit(event.option.value);
  }

  private initAutocomplete() {
    this.predictions$ = this.searchControl.valueChanges.pipe(
      map((value: PlaceAutoCompletePrediction | string | null) => {
        if (!value || this.searchControl.invalid) {
          return null;
        }
        if (typeof value === 'string') {
          return value.trim();
        } else {
          return value.LocalizedName;
        }
      }),
      distinctUntilChanged(),
      tap(() => (this.isDataLoading = true)),
      debounceTime(500),
      switchMap((value) => {
        return this.searchAutocompleteService
          .getPlacePredictions(value)
          .pipe(finalize(() => (this.isDataLoading = false)));
      }),
    );
  }
}
