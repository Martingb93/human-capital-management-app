export interface EmployeeRecord {
    name: string;
    id: number;
    imageUrl?: string;
    departmentId: number;
    salary: number;
    role: string;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    managerName: string;
    managerId: number;
    managerImageUrl?: string;
}