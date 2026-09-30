import cn from "classnames";
import foundationStyles from "../FoundationTable/FoundationTable.module.scss";
import type { TokenTableProps } from "./types";

export function TokenTable<T extends Record<string, string>>(props: TokenTableProps<T>) {
  const { columns, rows } = props;

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
