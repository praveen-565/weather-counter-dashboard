import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch weather data', () => {
    service.getWeather('London').subscribe(res => expect(res).toBeTruthy());
    const req = httpMock.expectOne(req => req.url.includes('weather'));
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});