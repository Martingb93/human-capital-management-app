import { GenericTableColumn } from "@core/models";

export const adminDepartmentColumns: GenericTableColumn[] = [
    {
        key: 'id',
        keyword: 'Id',
    },
    {
        key: 'name',
        keyword: 'Name',
    },
    {
        key: 'description',
        keyword: 'Description',
    },
    {
        key: 'managerId',
        keyword: 'Manager Id',
    },
    {
        width: 40
    }
];