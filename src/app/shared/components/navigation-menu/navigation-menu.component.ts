import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavigationMenuItem } from './model';
import { UserTypeRoleEnum } from '@core/models/enums';
import { UserStateService } from '@core/services/user/user-state.service';

@Component({
  selector: 'hcm-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  public readonly currentUser = inject(UserStateService).currentUser;

  public mainMenuItems: NavigationMenuItem[] = [];

  constructor() {
    this.setMenuItems();
  }

  private setMenuItems(): void {
    effect(() => {
      if (this.currentUser()) {
        this.mainMenuItems = this.getMenuItems();
      }
    });
  }

  private getMenuItems(): NavigationMenuItem[] {
    const userTypeRolePrefix = `${UserTypeRoleEnum[this.currentUser().type]?.toLowerCase()}`;

    switch (this.currentUser().type) {
      case UserTypeRoleEnum.Admin:
        return [
          {
            icon: 'dashboard',
            label: 'Dashboard',
            route: 'dashboard',
          },
          {
            icon: 'group',
            label: 'Employee Records',
            route: `${userTypeRolePrefix}/employee-records`
          },
          {
            icon: 'location_city',
            label: 'Departments',
            route: `${userTypeRolePrefix}/departments`,
          },
          {
            icon: 'settings',
            label: 'Settings',
            route: `settings`,
          },
        ];
      case UserTypeRoleEnum.Manager:
        return [
          {
            icon: 'dashboard',
            label: 'Dashboard',
            route: 'dashboard',
          },
          {
            icon: 'settings',
            label: 'Settings',
            route: `settings`,
          },
        ];
      default:
        return [];
    }
  }
}
