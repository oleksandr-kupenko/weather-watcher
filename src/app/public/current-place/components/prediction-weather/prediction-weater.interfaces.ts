
export interface WeatherForecast {
  forecast: ForecastDay[],
  description: string;
}

export interface WeatherForecastTelemetry {
  [key: string]: number;
}
export interface ForecastDay {
  date: number;
  dayInfo: ForecastPartDay;
  nightInfo: ForecastPartDay;
  minTemperature: number;
  maxTemperature: number;
}

export interface ForecastPartDay {
  iconNumber: number,
  description: string
}

interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface WeatherForecastResponse {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: DailyForecast[];
}
