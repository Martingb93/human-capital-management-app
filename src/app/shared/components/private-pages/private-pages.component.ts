import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { RouterOutlet } from '@angular/router';
import { UserStateService } from '@core/services/user';

@Component({
  selector: 'hcm-private-pages',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavigationMenuComponent, RouterOutlet],
  templateUrl: './private-pages.component.html',
  styleUrl: './private-pages.component.scss'
})
export class PrivatePagesComponent {
  private readonly userStateService = inject(UserStateService);
  
  constructor() {
    this.userStateService.loadCurrentUser();
  }
}
