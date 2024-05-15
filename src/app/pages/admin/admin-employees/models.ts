import { GenericTableColumn } from "@core/models";

export const adminEmployeeRecordColumns: GenericTableColumn[] = [
    {
        width: 40
    },
    {
        key: 'name',
        keyword: 'Name',
    },
    {
        key: 'departmentId',
        keyword: 'Department',
    },
    {
        key: 'role',
        keyword: 'Role',
    },
    {
        key: 'salary',
        keyword: 'Salary',
    },
    {
        width: 40
    },
];