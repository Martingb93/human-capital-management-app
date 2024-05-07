import { Component, Input } from '@angular/core';
import { ContentLoaderComponent } from '../content-loader/content-loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hcm-page-layout',
  standalone: true,
  imports: [ContentLoaderComponent, CommonModule],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {
  @Input() public titleKeyword = '';
  @Input() public isLoading = false;
}
