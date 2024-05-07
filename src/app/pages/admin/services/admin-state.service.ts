import { Injectable, inject, signal } from '@angular/core';
import { PaginatedResult, NormalLayoutResult } from '@core/models';
import { AdminApiService } from './admin-api.service';
import { Department, EmployeeRecord } from '../models';
import { adminEmployeeRecordColumns } from '../admin-employees/models';
import { adminDepartmentColumns } from '../admin-departments/models';
import { tap } from 'rxjs';

@Injectable()
export class AdminStateService {
    public readonly adminApiService = inject(AdminApiService);

    public adminDepartment = signal<NormalLayoutResult<Department>>(null);
    public adminDepartmentLoading = signal<boolean>(true);
    public adminDepartments = signal<PaginatedResult<Department>>(null);
    public adminEmployeeRecord = signal<EmployeeRecord>(null);
    public adminEmployeeRecords = signal<PaginatedResult<EmployeeRecord>>(null);

    public loadAdminEmployeeRecord(employeeRecordId: number): void {
        this.adminApiService.getAdminEmployeeRecord(employeeRecordId).subscribe(result => this.adminEmployeeRecord.set(result));
    }

    public saveAdminEmployeeRecord(employeeRecord: EmployeeRecord): void {
        this.adminApiService.saveAdminEmployeeRecord(employeeRecord).subscribe();
    }

    public clearAdminEmployeeRecord(): void {
        this.adminEmployeeRecord.set(null);
    }

    public loadAdminEmployeeRecords(): void {
        this.adminEmployeeRecords.update(data => ({ ...data, ...{ loading: true } }));

        this.adminApiService.getAdminEmployeeRecords()
            .subscribe(result => {
                const newResult = {
                    columns: adminEmployeeRecordColumns,
                    items: result,
                    loading: false
                };

                this.adminEmployeeRecords.set(newResult);
            });
    }

    public deleteAdminEmployeeRecord(employeeRecordId: number): void {
        this.adminApiService.deleteAdminEmployeeRecord(employeeRecordId)
            .pipe(tap(() => this.adminEmployeeRecords.update(data => ({ ...data, ...{ loading: true } }))))
            .subscribe(result => this.adminEmployeeRecords.update(data => ({ ...data, ...{ items: result, loading: false } })));
    }

    public loadAdminDepartments(): void {
        this.adminDepartments.update(data => ({ ...data, ...{ loading: true } }));

        this.adminApiService.getAdminDepartments()
            .subscribe(departments => {
                const newResult = {
                    columns: adminDepartmentColumns,
                    items: departments,
                    itemsMapType: departments.reduce((acc: { [id: number]: string }, department) => {
                        acc[department.id] = department.name;
                        return acc;
                    }, {}),
                    loading: false
                };

                this.adminDepartments.set(newResult);
            });
    }

    public loadAdminDepartment(departmentId: number): void {
        this.adminDepartment.update(data => ({ ...data, ...{ loading: true } }));

        this.adminApiService.getAdminDepartment(departmentId).subscribe(result => {
            const newResult = {
                data: result,
                loading: false
            };

            this.adminDepartment.set(newResult);
        });
    }

    public saveAdminDepartment(departmentId: Department): void {
        this.adminApiService.saveAdminDepartment(departmentId).subscribe();
    }

    public deleteAdminDepartment(departmentId: number): void {
        this.adminApiService.deleteAdminDepartment(departmentId)
            .pipe(tap(() => this.adminDepartments.update(data => ({ ...data, ...{ loading: true } }))))
            .subscribe(result => this.adminDepartments.update(data => ({ ...data, ...{ items: result, loading: false } })));
    }

    public clearAdminDepartment(): void {
        this.adminDepartment.set(null);
    }
}
