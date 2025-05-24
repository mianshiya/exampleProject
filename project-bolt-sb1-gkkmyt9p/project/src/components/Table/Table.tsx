import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import { TableProps } from './types';

const Table: React.FC<TableProps> = ({
  columns,
  data,
  currentPage,
  pageSize,
  total,
  sortConfig,
  filters,
  onPageChange,
  onPageSizeChange,
  onSort,
  onFilter,
}) => {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            filters={filters}
            onSort={onSort}
            onFilter={onFilter}
          />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
      
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default Table;