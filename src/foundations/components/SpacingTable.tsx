import cn from "classnames";
import type { SpacingDoc } from "../foundations.data";
import foundationStyles from "./FoundationTable.module.scss";
import styles from "./SpacingTable.module.scss";

type SpacingTableProps = {
  items: SpacingDoc[];
};

export function SpacingTable({ items }: SpacingTableProps) {
  return (
    <div className={foundationStyles.foundationTable__wrapper}>
      <table className={cn(foundationStyles.foundationTable, "foundationTable", "sb-unstyled")}>
        <thead>
          <tr>
            <th className={styles.spacingTable__nameColumn} scope="col">
              Name
            </th>
            <th className={styles.spacingTable__scaleColumn} scope="col">
              Scale
            </th>
            <th className={styles.spacingTable__valueColumn} scope="col">
              Value
            </th>
            <th scope="col">CSS custom property</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td className={styles.spacingTable__scaleColumn}>
                <div className={styles.spacingTable__barTrack}>
                  <div
                    aria-hidden="true"
                    className={styles.spacingTable__bar}
                    style={{ width: item.value }}
                  />
                </div>
              </td>
              <td className={styles.spacingTable__valueColumn}>{item.value}</td>
              <td>
                <span className={foundationStyles.foundationTable__tokenPill}>
                  {item.token ?? "primitive only"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
