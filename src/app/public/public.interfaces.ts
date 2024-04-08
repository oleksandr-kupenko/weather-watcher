import { CountryData } from './current-place/components/search-autocomplete/search-autocomplete.interfaces';

export interface PlaceWithCurrentWeather {
  name: string;
  currentTemperature: number | null;
  iconNumber: number | null;
  key: string;
  countryData: CountryData;
  description: string | null;
}


