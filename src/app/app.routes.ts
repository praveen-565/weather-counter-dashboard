import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { HomeComponent } from './pages/home/home.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'counter', component: CounterComponent },
  { path: 'vatavaran', component: WeatherComponent },
  { path: '**', redirectTo: '' } 
];
