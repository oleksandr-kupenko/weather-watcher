import { CountryData } from '../search-autocomplete/search-autocomplete.interfaces';

export interface CurrentPlaceWithWeather {
  name: string;
  currentTemperature: number | null;
  iconNumber: number | null;
  key: string;
  countryData: CountryData;
}

export interface CurrentWeather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  MobileLink: string;
  Link: string;
}

export interface PlaceLocation {
  lat: number;
  lng: number;
}
