export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: null;
    roles: Role[];
}

export type Role = {
    name: string;
    description: string;
    permissions: any[];
}
