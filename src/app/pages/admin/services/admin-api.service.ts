import { Injectable } from '@angular/core';

import { BaseApi } from '@core/services/base/base-api';
import { Department, EmployeeRecord } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class AdminApiService extends BaseApi {
    protected override get controller(): string {
        return 'Admin';
    }

    public getAdminEmployeeRecord(employeeRecordId: number): Observable<EmployeeRecord> {
        return this.get<EmployeeRecord>('GetAdminEmployeeRecord', { employeeRecordId });
    }

    public saveAdminEmployeeRecord(employeeRecord: EmployeeRecord): Observable<boolean> {
        return this.post<boolean, EmployeeRecord>('SaveAdminEmployeeRecord', employeeRecord);
    }

    public getAdminEmployeeRecords(): Observable<EmployeeRecord[]> {
        return this.get<EmployeeRecord[]>('GetAdminEmployeeRecords');
    }

    public deleteAdminEmployeeRecord(employeeRecordId: number): Observable<EmployeeRecord[]> {
        return this.delete<EmployeeRecord[]>('DeleteAdminEmployeeRecord', { employeeRecordId });
    }

    public saveAdminDepartment(department: Department): Observable<boolean> {
        return this.post<boolean, Department>('SaveAdminDepartment', department);
    }

    public deleteAdminDepartment(departmentId: number): Observable<Department[]> {
        return this.delete<Department[]>('DeleteAdminDepartment', { departmentId });
    }

    public getAdminDepartment(departmentId: number): Observable<Department> {
        return this.get<Department>('GetAdminDepartment', { departmentId });
    }

    public getAdminDepartments(): Observable<Department[]> {
        return this.get<Department[]>('GetAdminDepartments');
    }
}
