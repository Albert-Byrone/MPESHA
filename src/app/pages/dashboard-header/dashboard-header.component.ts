import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {
  status = false;
  addToggle() {
    this.status = !this.status;
  }
}
