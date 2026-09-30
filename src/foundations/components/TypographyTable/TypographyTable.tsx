import cn from "classnames";
import foundationStyles from "../FoundationTable/FoundationTable.module.scss";
import styles from "./TypographyTable.module.scss";
import type { TypographyTableProps } from "./types";

export function TypographyTable(props: TypographyTableProps) {
  const { labels, rows } = props;

  return (
    <div className={foundationStyles.foundationTable__wrapper}>
      <table
        className={cn(
          foundationStyles.foundationTable,
          styles.typographyTable,
          "foundationTable",
          "sb-unstyled",
        )}
      >
        <thead>
          <tr>
            <th scope="col">{labels.type}</th>
            <th scope="col">{labels.description}</th>
            <th scope="col">{labels.fontFamily}</th>
            <th scope="col">{labels.fontFamilyBackups}</th>
            <th scope="col">{labels.fontSize}</th>
            <th scope="col">{labels.lineHeight}</th>
            <th scope="col">{labels.fontWeight}</th>
            <th scope="col">{labels.token}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={styles.typographyTable__typeCell}>
                <span className={row.id}>{row.name}</span>
              </td>
              <td className={styles.typographyTable__descriptionCell}>{row.description}</td>
              <td className={styles.typographyTable__fontFamilyCell}>{row.fontFamily}</td>
              <td className={styles.typographyTable__fontFamilyBackupsCell}>
                {row.fontFamilyBackups}
              </td>
              <td>{row.fontSize}</td>
              <td>{row.lineHeight}</td>
              <td>{row.fontWeight}</td>
              <td className={styles.typographyTable__tokenCell}>
                <span className={foundationStyles.foundationTable__tokenPill}>{row.token}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
