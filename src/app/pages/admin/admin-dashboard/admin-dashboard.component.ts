import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';

@Component({
  selector: 'hcm-admin-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, PageLayoutComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
