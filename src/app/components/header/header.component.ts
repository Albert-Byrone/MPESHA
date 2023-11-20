import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeLink: string | null;
  scrollActive: boolean;

  constructor() {
    this.activeLink = null;
    this.scrollActive = false;
  }
}
