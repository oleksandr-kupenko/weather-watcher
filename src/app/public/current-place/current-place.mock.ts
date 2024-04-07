import { CurrentWeather } from './components/current-weather/current-weather.interface';

export const currentPlaceMock: CurrentWeather[] = [
  {
    LocalObservationDateTime: '2024-04-07T23:17:00+09:00',
    EpochTime: 1712499420,
    WeatherText: 'Mostly cloudy',
    WeatherIcon: 38,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 17.3,
        Unit: 'C',
        UnitType: 17,
      },
      Imperial: {
        Value: 63,
        Unit: 'F',
        UnitType: 18,
      },
    },
    MobileLink: 'http://www.accuweather.com/en/jp/kyoto-shi/224436/current-weather/224436?lang=en-us',
    Link: 'http://www.accuweather.com/en/jp/kyoto-shi/224436/current-weather/224436?lang=en-us',
  },
];
