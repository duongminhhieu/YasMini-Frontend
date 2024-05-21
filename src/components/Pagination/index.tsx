import React from 'react';
import { Pagination } from 'antd';

interface PaginationProps {
    total: number;
    pageSize: number;
    currentPage: number;
    onChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
    total,
    pageSize,
    currentPage,
    onChange,
}) => {
    return (
        <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={onChange}
        />
    );
};

export default CustomPagination;
