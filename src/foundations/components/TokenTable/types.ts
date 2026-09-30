export type TokenTableColumn<T extends Record<string, string>> = {
  header: string;
  accessor: keyof T;
  mono?: boolean;
};

export type TokenTableProps<T extends Record<string, string>> = {
  columns: TokenTableColumn<T>[];
  rows: T[];
};
