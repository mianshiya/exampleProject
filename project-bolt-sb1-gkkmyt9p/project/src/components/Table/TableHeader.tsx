import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { TableColumn, SortOrder, FilterValue } from './types';

interface TableHeaderProps {
  columns: TableColumn[];
  sortConfig: { key: string; order: SortOrder } | null;
  filters: Record<string, FilterValue>;
  onSort: (key: string, order: SortOrder) => void;
  onFilter: (key: string, value: FilterValue) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortConfig,
  filters,
  onSort,
  onFilter,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleSortClick = (key: string) => {
    let newOrder: SortOrder = 'ascend';
    
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.order === 'ascend') {
        newOrder = 'descend';
      } else if (sortConfig.order === 'descend') {
        // 重置排序
        onSort('', '');
        return;
      }
    }
    
    onSort(key, newOrder);
  };

  const handleFilterClick = (key: string) => {
    setActiveFilter(activeFilter === key ? null : key);
  };

  const handleFilterChange = (key: string, value: FilterValue) => {
    onFilter(key, value);
  };

  const renderSortIcon = (column: TableColumn) => {
    if (!column.sortable) return null;
    
    if (sortConfig && sortConfig.key === column.key) {
      if (sortConfig.order === 'ascend') {
        return <ArrowUp className="w-4 h-4 text-blue-500" />;
      } else {
        return <ArrowDown className="w-4 h-4 text-blue-500" />;
      }
    }
    
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  };

  const renderFilterControl = (column: TableColumn) => {
    if (!column.filterable || activeFilter !== column.key) return null;
    
    const currentValue = filters[column.key] || '';
    
    switch (column.filterType) {
      case 'text':
        return (
          <div className="p-2 bg-white shadow-lg rounded absolute z-10 mt-1 right-0 w-48">
            <input
              type="text"
              placeholder="搜索..."
              className="w-full px-2 py-1 border rounded"
              value={currentValue as string}
              onChange={(e) => handleFilterChange(column.key, e.target.value)}
            />
          </div>
        );
      
      case 'number':
        return (
          <div className="p-2 bg-white shadow-lg rounded absolute z-10 mt-1 right-0 w-48">
            <input
              type="number"
              placeholder="搜索..."
              className="w-full px-2 py-1 border rounded"
              value={currentValue as number}
              onChange={(e) => handleFilterChange(column.key, e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        );
      
      case 'select':
        return (
          <div className="p-2 bg-white shadow-lg rounded absolute z-10 mt-1 right-0 w-48">
            <select
              className="w-full px-2 py-1 border rounded"
              value={currentValue as string}
              onChange={(e) => handleFilterChange(column.key, e.target.value)}
            >
              <option value="">全部</option>
              {column.filterOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b relative"
            style={{ width: column.width }}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center space-x-1 ${column.sortable ? 'cursor-pointer' : ''}`}
                onClick={column.sortable ? () => handleSortClick(column.key) : undefined}
              >
                <span>{column.title}</span>
                {renderSortIcon(column)}
              </div>
              
              {column.filterable && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFilterClick(column.key);
                    }}
                    className={`p-1 rounded hover:bg-gray-200 ${
                      filters[column.key] ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  {renderFilterControl(column)}
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;