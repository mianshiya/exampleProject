import React from 'react';
import { TableColumn } from './types';

interface TableBodyProps {
  columns: TableColumn[];
  data: any[];
}

const TableBody: React.FC<TableBodyProps> = ({ columns, data }) => {
  return (
    <tbody>
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <tr
            key={row.id || rowIndex}
            className={`${
              rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } transition-colors duration-150 hover:bg-blue-50`}
          >
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-3 text-sm text-gray-800 border-b">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
            暂无数据
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;