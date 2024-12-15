export interface Pagination {
    count: number;
    pageCount: number;
    page: number;
    hasNextPage: boolean;
    handleChangePage: (page: number) => Promise<void>;
}
