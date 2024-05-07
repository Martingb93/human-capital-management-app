import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { TableModule } from 'primeng/table';
import { AdminStateService } from '../services/admin-state.service';
import { MATERIAL_MODULES } from '@core/material';
import { CommonModule } from '@angular/common';
import { EmptyContentComponent } from '@shared/components/empty-content/empty-content.component';

@Component({
  selector: 'hcm-admin-departments',
  standalone: true,
  imports: [PageLayoutComponent, TableModule, RouterModule, MATERIAL_MODULES, CommonModule, EmptyContentComponent],
  templateUrl: './admin-departments.component.html',
})
export class AdminDepartmentsComponent {
  public readonly adminStateService = inject(AdminStateService);

  public departments = this.adminStateService.adminDepartments;

  constructor() {
    this.adminStateService.loadAdminDepartments();
  }

  public onDeleteDepartment(departmentId: number): void {
    this.adminStateService.deleteAdminDepartment(departmentId)
  }
}
