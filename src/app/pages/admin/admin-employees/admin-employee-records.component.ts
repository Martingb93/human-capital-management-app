import { CommonModule, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_MODULES } from '@core/material';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { AdminStateService } from '../services/admin-state.service';
import { TableModule } from 'primeng/table';
import { EmptyContentComponent } from '@shared/components/empty-content/empty-content.component';
import { HcmCurrencyPipe } from '@shared/pipes/currency/currency.pipe';

@Component({
  selector: 'hcm-admin-employee-records',
  standalone: true,
  imports: [PageLayoutComponent, CommonModule, MATERIAL_MODULES, RouterModule, TableModule, EmptyContentComponent, HcmCurrencyPipe, NgOptimizedImage],
  providers: [DecimalPipe],
  templateUrl: './admin-employee-records.component.html',
  styleUrl: './admin-employee-records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEmployeeRecordsComponent {
  public readonly adminStateService = inject(AdminStateService);

  public employeeRecords = this.adminStateService.adminEmployeeRecords;
  public departments = this.adminStateService.adminDepartments;

  constructor() {
    this.adminStateService.loadAdminEmployeeRecords();
    this.adminStateService.loadAdminDepartments();
  }

  public onDeleteEmployeeRecord(employeeRecordId: number) {
    this.adminStateService.deleteAdminEmployeeRecord(employeeRecordId);
  }
}
