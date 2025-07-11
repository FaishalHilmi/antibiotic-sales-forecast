export interface TableProps<T> {
  column: Column<T>[];
  data: T[];
  searchKeys: (keyof T)[];
  placeholder?: string;
}
