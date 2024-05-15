import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'hcm-private-pages',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavigationMenuComponent, RouterOutlet],
  templateUrl: './private-pages.component.html',
  styleUrl: './private-pages.component.scss'
})
export class PrivatePagesComponent {
}
