import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services';
import { UserStateService } from '@core/services/user';

@Component({
  selector: 'hcm-user-header',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, MatMenuModule, RouterModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent {
  public readonly currentUser = inject(UserStateService).currentUser;

  private readonly authenticationService = inject(AuthenticationService);

  public onLogout(): void {
    this.authenticationService.logout();
  }
}
