import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { RouterModule } from '@angular/router';
import { UserStateService } from '@core/services/user';

@Component({
  selector: 'hcm-header',
  standalone: true,
  imports: [NgOptimizedImage, UserHeaderComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly userTypeRole = inject(UserStateService).userTypeRole;
}
