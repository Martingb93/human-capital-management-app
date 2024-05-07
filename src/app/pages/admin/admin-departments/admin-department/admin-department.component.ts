import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Department } from '@pages/admin/models';
import { AdminStateService } from '@pages/admin/services/admin-state.service';
import { PageLayoutComponent } from '@shared/components/page-layout/page-layout.component';
import { filter, take } from 'rxjs';

@Component({
  selector: 'hcm-admin-department',
  standalone: true,
  imports: [PageLayoutComponent, NgOptimizedImage, ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './admin-department.component.html',
  styleUrl: './admin-department.component.scss'
})
export class AdminDepartmentComponent implements OnDestroy, OnInit {
  public readonly activatedRoute = inject(ActivatedRoute);
  public readonly adminStateService = inject(AdminStateService);

  public titleKeyword = 'New Department';
  public department = this.adminStateService.adminDepartment;
  public departmentFormGroup = new FormGroup({
    name: new FormControl<string>(null, [Validators.required]),
    description: new FormControl<string>(null),
  });

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.setFormGroup();
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1), filter(params => params['id'])).subscribe(params => this.adminStateService.loadAdminDepartment(params['id']));
  }

  public ngOnDestroy(): void {
    this.adminStateService.clearAdminDepartment();
  }

  public onDeleteDepartment() {
    this.adminStateService.deleteAdminDepartment(this.department().data.id);
  }

  public onSaveDepartment(): void {
    const updatedDepartment: Department = {
      ...this.department()?.data,
      id: this.department()?.data.id ?? null,
      name: this.departmentFormGroup.controls['name'].value,
      description: this.departmentFormGroup.controls['description'].value,
    }

    this.adminStateService.saveAdminDepartment(updatedDepartment);
  }

  private setFormGroup(): void {
    effect(() => {
      if (this.department()) {
        this.titleKeyword = `Department ${this.department().data?.name} - ID: ${this.department().data?.id}`;

        this.departmentFormGroup.reset({
          name: this.department().data?.name,
          description: this.department().data?.description,
        });

        this.cdr.markForCheck();
      }
    });
  }
}
