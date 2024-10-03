import { Component } from '@angular/core';

interface MenuItem {
  route: string,
  title: string,
}


@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    {
      route: 'reactive/basic',
      title: 'Básicos'
    },
    {
      route: 'reactive/dynamic',
      title: 'Dinámicos'
    },
    {
      route: 'reactive/switches',
      title: 'Switches'
    }
  ];

  public authMenu: MenuItem[] = [
    {
      route: 'auth/sign-up',
      title: 'Register'
    }
  ];
}
