import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from './types';

const usePagination = (data: any, searchParams: any, limit = 10): Pagination => {
    const { query, push, pathname } = useRouter();

    const handleChangePage = async (page: number) => {
        await push({
            pathname,
            query: {
                ...query,
                page,
            },
        });
    };

    return useMemo<Pagination>(() => {
        const _pagination: Pagination = {
            page: query.page ? +query.page : 1,
            count: 0,
            hasNextPage: false,
            pageCount: 0,
            handleChangePage,
        };

        if (data) {
            const { count, next } = data;
            _pagination.count = count;
            _pagination.hasNextPage = !!next;
            _pagination.pageCount = Math.ceil(Math.fround(count / limit));
        }

        return _pagination;
    }, [data, searchParams]);
};

export default usePagination;
