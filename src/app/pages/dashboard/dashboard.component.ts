import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserStateService } from '@core/services/user';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';

@Component({
  selector: 'hcm-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, PageLayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public readonly currentUser = inject(UserStateService).currentUser;
}
