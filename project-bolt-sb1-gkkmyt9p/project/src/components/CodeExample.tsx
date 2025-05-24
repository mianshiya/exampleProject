import React, { useState } from 'react';

const CodeExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('usage');
  
  const usageCode = `// 使用示例
import React, { useState } from 'react';
import Table from './components/Table';
import { TableColumn, SortOrder, FilterValue } from './components/Table/types';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  // 定义表格列
  const columns = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      title: '姓名',
      sortable: true,
      filterable: true,
      filterType: 'text',
    },
    // 更多列...
  ];

  // 处理分页变化
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 处理排序变化
  const handleSort = (key, order) => {
    setSortConfig({ key, order });
  };

  // 处理筛选变化
  const handleFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <Table
      columns={columns}
      data={data}
      currentPage={currentPage}
      pageSize={pageSize}
      total={total}
      sortConfig={sortConfig}
      filters={filters}
      onPageChange={handlePageChange}
      onPageSizeChange={setPageSize}
      onSort={handleSort}
      onFilter={handleFilter}
    />
  );
};`;

  const tableComponentCode = `// Table.tsx
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

export default Table;`;

  const typesCode = `// types.ts
export type SortOrder = 'ascend' | 'descend' | '';
export type FilterValue = string | number | boolean | undefined;

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'number' | 'select';
  filterOptions?: FilterOption[];
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  currentPage: number;
  pageSize: number;
  total: number;
  sortConfig: { key: string; order: SortOrder } | null;
  filters: Record<string, FilterValue>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (key: string, order: SortOrder) => void;
  onFilter: (key: string, value: FilterValue) => void;
}`;

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden border">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'usage'
              ? 'bg-white text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('usage')}
        >
          使用示例
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'component'
              ? 'bg-white text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('component')}
        >
          表格组件
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'types'
              ? 'bg-white text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('types')}
        >
          类型定义
        </button>
      </div>
      
      <div className="p-4 bg-gray-900 overflow-x-auto">
        <pre className="text-gray-300 text-sm">
          <code>
            {activeTab === 'usage' && usageCode}
            {activeTab === 'component' && tableComponentCode}
            {activeTab === 'types' && typesCode}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeExample;