export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: null;
    isActive: boolean | null;
    roles: Role[];

    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}

export type Role = {
    name: string;
    description: string;
    permissions: any[];
}

export type UserRegister = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
