
export type Pagination = {
    total: number;
    page: number;
    itemsPerPage: number;
    data?: [];
}

export type PaginationParams = {
    current: number;
    pageSize: number;
    total: number;
};



