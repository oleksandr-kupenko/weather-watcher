import { CountryData } from './current-place/components/search-autocomplete/search-autocomplete.interfaces';

export interface PlaceWithCurrentWeather {
  name: string;
  currentTemperature: number | null;
  iconNumber: number | null;
  key: string;
  countryData: CountryData;
  description: string | null;
}

export type PlaceWithCurrentWeatherWithoutKey = Omit<PlaceWithCurrentWeather, 'name' | 'key' | 'countryData'> & {
  key: string | null;
  name: string | null;
  countryData: { ID: string | null; LocalizedName: string | null };
};

export class PlaceFabric {
  key: string | null;
  currentTemperature: number | null;
  name: string | null;
  iconNumber: number | null;
  countryData: { ID: string | null; LocalizedName: string | null };
  description: string | null;

  constructor(
    key: string | null = '324505',
    countryData: CountryData | null = { ID: 'ua', LocalizedName: 'Ukraine' },
    name: string | null = 'Kyiv',
  ) {
    this.key = key;
    this.countryData = countryData ? countryData : { ID: null, LocalizedName: null };
    this.name = name;
    this.currentTemperature = null;
    this.iconNumber = null;
    this.description = null;
  }
}
