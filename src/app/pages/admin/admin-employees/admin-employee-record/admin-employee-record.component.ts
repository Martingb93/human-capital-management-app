import { ChangeDetectorRef, Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { filter, take } from 'rxjs';
import { AdminStateService } from '../../services/admin-state.service';
import { Department, EmployeeRecord } from '../../models';
import { MatButtonModule } from '@angular/material/button';
import { ValidationService } from '@core/services/validation/validation.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'hcm-admin-employee-record',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, ReactiveFormsModule, MatButtonModule, NgOptimizedImage, MatIconModule, RouterModule, MatMenuModule],
  templateUrl: './admin-employee-record.component.html',
  styleUrl: './admin-employee-record.component.scss'
})
export class AdminEmployeeRecordComponent implements OnDestroy, OnInit {
  public readonly activatedRoute = inject(ActivatedRoute);
  public readonly adminStateService = inject(AdminStateService);

  public employeeRecord = this.adminStateService.adminEmployeeRecord;
  public departments = this.adminStateService.adminDepartments;
  public titleKeyword = 'New Employee Record';
  public employeeRecordFormGroup = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
    departmentId: new FormControl<number>(null, [Validators.required]),
    role: new FormControl<string>(null, [Validators.required]),
    salary: new FormControl<number>(null, [Validators.required, Validators.min(1), ValidationService.numberIsInteger]),
  });

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.adminStateService.loadAdminDepartments();
    this.setFormGroup();
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1), filter(params => params['id'])).subscribe(params => this.adminStateService.loadAdminEmployeeRecord(params['id']));
  }

  public ngOnDestroy(): void {
    this.adminStateService.clearAdminEmployeeRecord();
  }

  public onDeleteEmployeeRecord() {
    this.adminStateService.deleteAdminEmployeeRecord(this.employeeRecord().id);
  }

  public onSaveEmployeeRecord(): void {
    const updatedEmployeeRecord: EmployeeRecord = {
      ...this.employeeRecord(),
      id: this.employeeRecord()?.id ?? null,
      name: this.employeeRecordFormGroup.controls['name'].value,
      departmentId: this.employeeRecordFormGroup.controls['departmentId'].value,
      role: this.employeeRecordFormGroup.controls['role'].value,
      salary: this.employeeRecordFormGroup.controls['salary'].value
    };

    this.adminStateService.saveAdminEmployeeRecord(updatedEmployeeRecord);
  }

  public selectDepartment(department: Department): void {
    this.employeeRecordFormGroup.controls['departmentId'].setValue(department.id);
  }

  private setFormGroup(): void {
    effect(() => {
      if (this.employeeRecord()) {
        this.titleKeyword = `${this.employeeRecord().name}'s Employee Record - ID: ${this.employeeRecord().id}`;

        this.employeeRecordFormGroup.reset({
          name: this.employeeRecord().name,
          departmentId: this.employeeRecord().departmentId,
          role: this.employeeRecord().role,
          salary: this.employeeRecord().salary
        });

        this.cdr.markForCheck();
      }
    });
  }
}
