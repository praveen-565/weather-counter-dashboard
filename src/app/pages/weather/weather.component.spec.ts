import { render, screen, fireEvent } from '@testing-library/angular';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError } from 'rxjs';

describe('WeatherComponent', () => {
  it('should display error for invalid city', async () => {
    await render(WeatherComponent, {
      providers: [{ provide: WeatherService, useValue: { getWeather: () => throwError(() => new Error('Invalid city')) } }]
    });

    fireEvent.input(screen.getByPlaceholderText('Enter City'), { target: { value: 'InvalidCity' } });
    fireEvent.click(screen.getByText('Add'));
  });

  it('should add valid city', async () => {
    await render(WeatherComponent, {
      providers: [{ provide: WeatherService, useValue: { getWeather: () => of({ name: 'Delhi', main: { temp: 30 } }) } }]
    });

    fireEvent.input(screen.getByPlaceholderText('Enter City'), { target: { value: 'Delhi' } });
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByText(/Delhi/)).toBeTruthy();
  });
});