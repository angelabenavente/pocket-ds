import cn from "classnames";
import foundationStyles from "../FoundationTable/FoundationTable.module.scss";
import styles from "./ColorTable.module.scss";
import type { ColorTableProps } from "./types";

export function ColorTable(props: ColorTableProps) {
  const { caption, rows } = props;

  return (
    <div className={foundationStyles.foundationTable__wrapper}>
      <table
        className={cn(
          foundationStyles.foundationTable,
          styles.colorTable,
          "foundationTable",
          "sb-unstyled",
        )}
      >
        <caption className={styles.colorTable__caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Token</th>
            <th scope="col">Source / alias</th>
            <th scope="col">Value</th>
            <th scope="col">Preview</th>
            <th scope="col">Usage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((color) => (
            <tr key={color.token}>
              <td>{color.title}</td>
              <td className={styles.colorTable__tokenCell}>
                <span className={foundationStyles.foundationTable__tokenPill}>{color.token}</span>
              </td>
              <td className={styles.colorTable__sourceCell}>
                {color.source ? (
                  <span className={foundationStyles.foundationTable__tokenPill}>
                    {color.source}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className={styles.colorTable__valueCell}>{color.value}</td>
              <td className={styles.colorTable__previewCell}>
                <span
                  aria-hidden="true"
                  className={styles.colorTable__swatch}
                  style={{ backgroundColor: color.value }}
                />
              </td>
              <td className={styles.colorTable__descriptionCell}>{color.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
