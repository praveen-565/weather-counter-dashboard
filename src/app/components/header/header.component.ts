import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() counterCount = 0;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigateToCounter(){
    this.router.navigate(['/counter']);
  }

  navigateToWeather(){
    this.router.navigate(['/vatavaran']);
  }
}
