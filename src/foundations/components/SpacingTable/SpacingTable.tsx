import cn from "classnames";
import foundationStyles from "../FoundationTable/FoundationTable.module.scss";
import styles from "./SpacingTable.module.scss";
import type { SpacingTableProps } from "./types";

export function SpacingTable(props: SpacingTableProps) {
  const { items, labels } = props;

  return (
    <div className={foundationStyles.foundationTable__wrapper}>
      <table className={cn(foundationStyles.foundationTable, "foundationTable", "sb-unstyled")}>
        <thead>
          <tr>
            <th className={styles.spacingTable__nameColumn} scope="col">
              {labels.name}
            </th>
            <th className={styles.spacingTable__scaleColumn} scope="col">
              {labels.scale}
            </th>
            <th className={styles.spacingTable__valueColumn} scope="col">
              {labels.value}
            </th>
            <th scope="col">{labels.token}</th>
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
                  {item.token ?? labels.primitiveOnly}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
