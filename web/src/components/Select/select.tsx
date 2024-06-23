import React from "react";
import { G_STATUS_KEY, G_STATUS_OBJECT } from "../../Utils/utils";
import styles from "./select.module.css";

const CustomSelect: React.FC<any> = (props) => {
  const [, ...restKeys] = G_STATUS_KEY;
  const filteredList = props?.isTaskForm ? restKeys : G_STATUS_KEY;
  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} {...props}>
        {filteredList.map((item) => {
          return (
            <option key={item} value={item}>
              {G_STATUS_OBJECT[item].value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomSelect;
