import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private readonly API_KEY = 'YOUR_ACCUWEATHER_API_KEY';
  private readonly BASE_URL = 'https://dataservice.accuweather.com';

  constructor(private http: HttpClient) {}
}
