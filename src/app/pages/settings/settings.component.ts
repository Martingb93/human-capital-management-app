import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserStateService } from '@core/services/user';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';

@Component({
  selector: 'hcm-settings',
  standalone: true,
  imports: [PageLayoutComponent, NgOptimizedImage],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  public readonly currentUser = inject(UserStateService).currentUser;
}
