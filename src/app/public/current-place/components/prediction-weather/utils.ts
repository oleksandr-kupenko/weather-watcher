import { ForecastDay, WeatherForecastTelemetry } from './prediction-weater.interfaces';

export const forecastToTelemetryTransformer = (forecastDays: ForecastDay[]): WeatherForecastTelemetry => {
  const result: WeatherForecastTelemetry = {};
  forecastDays.forEach(dayData => {
    const date = new Date(dayData.date);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    result[dayOfWeek] = {
      avg: (dayData.minTemperature + dayData.maxTemperature) / 2,
      min: dayData.minTemperature,
      max: dayData.maxTemperature,
      dayDescription: dayData.dayInfo.description,
      nightDescription: dayData.nightInfo.description
  };
  });
  return result;
}
