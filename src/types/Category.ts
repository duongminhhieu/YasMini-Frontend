
export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
    isAvailable: boolean;
    productCount: number;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}

export type CategoryParams = {

    name: string;
    isAvailable: boolean;
    page: number;
    itemsPerPage: number;
}