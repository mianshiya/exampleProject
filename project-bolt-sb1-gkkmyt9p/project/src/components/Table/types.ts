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
}