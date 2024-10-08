import { ReactNode } from "react";

export interface DataTable<T extends object> {
  dataKey: keyof T;
  compare?: (a: T, b: T) => number;
  renderHeaderCell?: (data?: unknown) => ReactNode;
  isSortable?: boolean;
  label: string;
  render?: (item: T) => ReactNode;
}

export interface DataTableProps<T extends object> {
  columns: DataTable<T>[];
  data: T[];
  selectionMode?: "single" | "multiselect";
  onRowClick?: (item: T | T[]) => void;
  searchValue?: string;
  setSearchValue?: (x: string) => void;
}
