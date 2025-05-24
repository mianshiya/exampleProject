import React, { useState } from 'react';
import Table from './Table/Table';
import { TableColumn, SortOrder, FilterValue } from './Table/types';
import { mockData } from '../data/mockData';
import CodeExample from './CodeExample';

const Demo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: string; order: SortOrder } | null>(null);
  const [filters, setFilters] = useState<Record<string, FilterValue>>({});

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      width: '80px',
    },
    {
      key: 'name',
      title: '姓名',
      sortable: true,
      filterable: true,
      filterType: 'text',
    },
    {
      key: 'age',
      title: '年龄',
      sortable: true,
      filterable: true,
      filterType: 'number',
    },
    {
      key: 'address',
      title: '地址',
      filterable: true,
      filterType: 'text',
    },
    {
      key: 'status',
      title: '状态',
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: '活跃', value: '活跃' },
        { label: '非活跃', value: '非活跃' },
      ],
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 重置到第一页
  };

  const handleSort = (key: string, order: SortOrder) => {
    setSortConfig({ key, order });
  };

  const handleFilter = (key: string, value: FilterValue) => {
    if (value === undefined || value === '') {
      const newFilters = { ...filters };
      delete newFilters[key];
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [key]: value });
    }
    setCurrentPage(1); // 重置到第一页
  };

  // 排序逻辑
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return mockData;

    return [...mockData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.order === 'ascend') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [mockData, sortConfig]);

  // 筛选逻辑
  const filteredData = React.useMemo(() => {
    return sortedData.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === '') return true;
        
        const column = columns.find(col => col.key === key);
        const itemValue = item[key];
        
        if (column?.filterType === 'number') {
          return String(itemValue).includes(String(value));
        } else if (column?.filterType === 'text') {
          return String(itemValue).includes(String(value));
        } else if (column?.filterType === 'select') {
          return itemValue === value;
        }
        
        return true;
      });
    });
  }, [sortedData, filters, columns]);

  // 分页逻辑
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">可复用表格组件示例</h2>
        <p className="text-gray-700 mb-6">
          这个示例展示了一个具有分页、排序和筛选功能的可复用表格组件。您可以通过点击列标题进行排序，
          使用筛选控件进行数据筛选，以及使用分页控件浏览数据。
        </p>
        
        <div className="mb-8">
          <Table
            columns={columns}
            data={paginatedData}
            currentPage={currentPage}
            pageSize={pageSize}
            total={totalItems}
            sortConfig={sortConfig}
            filters={filters}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSort={handleSort}
            onFilter={handleFilter}
          />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">设计与实现说明</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">组件设计</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>表格组件通过 props 接收数据源、列定义、分页配置、排序规则和筛选条件</li>
            <li>组件内部实现了表头、表体、分页器和筛选器等子组件</li>
            <li>所有状态变化通过回调函数传递给父组件，保持组件的可控性</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">功能实现</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><span className="font-medium">分页功能：</span>通过当前页码和每页条数控制显示的数据范围</li>
            <li><span className="font-medium">排序功能：</span>支持单列排序，可在升序和降序之间切换</li>
            <li><span className="font-medium">筛选功能：</span>支持文本、数字和下拉选择等多种筛选方式</li>
          </ul>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">代码示例</h2>
        <CodeExample />
      </section>
    </div>
  );
};

export default Demo;