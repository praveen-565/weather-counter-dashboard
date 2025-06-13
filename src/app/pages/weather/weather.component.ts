import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  cityName = '';
  locations = signal<any[]>([]);
  selectedCity = signal('');
  forecast = signal<any | null>(null);

  constructor(private weatherService: WeatherService) {}

  addCity() {
    if (this.cityName && !this.locations().some(c => c.name.toLowerCase() === this.cityName.toLowerCase())) {
      this.weatherService.getWeather(this.cityName).subscribe({
        next: (res) => {
          const city = { name: res.name, temp: res.main.temp };
          this.locations.update(list => [city, ...list.slice(0, 7)]);
          this.cityName = '';
          Swal.fire({
            icon: 'success',
            title: 'City Added!',
            text: `${res.name} (${res.main.temp}°C) added to your list.`
          });
        },
        error: () => Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Invalid city name. Please try again.'
        })
      });
    }
  }

  selectCity(city: any) {
    this.selectedCity.set(city.name);
    this.weatherService.getForecast(city.name).subscribe(res => this.forecast.set(res));
  }

  removeCity(city: any, event: MouseEvent) {
    event.stopPropagation();
    Swal.fire({
      title: `Remove ${city.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.locations.update(list => list.filter(c => c !== city));
        Swal.fire('Removed!', `${city.name} has been removed.`, 'success');
      }
    });
  }

  clearLocations() {
    Swal.fire({
      title: 'Clear All Cities?',
      text: 'This will remove all added cities.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear all!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.locations.set([]);
        this.forecast.set(null);
        this.selectedCity.set('');
        Swal.fire('Cleared!', 'All cities have been removed.', 'success');
      }
    });
  }
}
