import cn from "classnames";
import foundationStyles from "./FoundationTable.module.scss";

export type TokenTableColumn<T extends Record<string, string>> = {
  header: string;
  accessor: keyof T;
  mono?: boolean;
};

type TokenTableProps<T extends Record<string, string>> = {
  columns: TokenTableColumn<T>[];
  rows: T[];
};

export function TokenTable<T extends Record<string, string>>({
  columns,
  rows,
}: TokenTableProps<T>) {
  return (
    <div className={foundationStyles.foundationTable__wrapper}>
      <table className={cn(foundationStyles.foundationTable, "foundationTable", "sb-unstyled")}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.accessor)} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={Object.values(row).join("-")}>
              {columns.map((column) => {
                const value = row[column.accessor];
                return (
                  <td key={String(column.accessor)}>
                    {column.mono ? (
                      <span className={foundationStyles.foundationTable__tokenPill}>{value}</span>
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
