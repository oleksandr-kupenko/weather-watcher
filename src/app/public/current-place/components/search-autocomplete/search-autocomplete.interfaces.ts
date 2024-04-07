export interface PlaceAutoCompletePrediction {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: CountryData;
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export interface CountryData {
  ID: string;
  LocalizedName: string;
}
