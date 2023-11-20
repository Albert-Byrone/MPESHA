import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listUser = [
    {
      name: 'Users',
      number: '390',
      icon: 'assets/Icon/heroicons_sm-user.svg',
    },
    {
      name: 'Locations',
      number: '20',
      icon: 'assets/Icon/gridicons_location.svg',
    },
    {
      name: 'Transactions',
      number: '5.8M',
      icon: 'assets/Icon/bx_bxs-server.svg',
    },
  ];
}
